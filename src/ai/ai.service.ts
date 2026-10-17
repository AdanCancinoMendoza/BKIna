import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export interface ChatMessage {
  rol: 'user' | 'model' | 'system';
  contenido: string;
}

@Injectable()
export class AiService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtiene la API Key de Gemini configurada para la organización,
   * o recurre a la variable de entorno global GEMINI_API_KEY.
   */
  async obtenerApiKey(organizacionId: string): Promise<string> {
    const org = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
      select: { configuracionTema: true },
    });

    const temaConfig = (org?.configuracionTema as Record<string, any>) || {};
    const orgApiKey = temaConfig.geminiApiKey || temaConfig.googleApiKey;

    if (orgApiKey && typeof orgApiKey === 'string' && orgApiKey.trim().length > 10) {
      return orgApiKey.trim();
    }

    const envApiKey = process.env.GEMINI_API_KEY;
    if (envApiKey && envApiKey.trim().length > 10) {
      return envApiKey.trim();
    }

    throw new BadRequestException(
      'No se encontró una API Key de Gemini configurada para esta organización. Asígnala desde el Panel Administrativo o define GEMINI_API_KEY en el servidor.',
    );
  }

  /**
   * Recopila un resumen real de datos de la organización (ventas, stock, clientes, cortes)
   * para nutrir el contexto del LLM.
   */
  async recopilarContextoNegocio(organizacionId: string) {
    const org = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
      select: { nombre: true, rfc: true, email: true, telefono: true },
    });

    if (!org) {
      throw new NotFoundException('Organización no encontrada');
    }

    // 1. Estadísticas de Artículos e Inventario
    const totalArticulos = await this.prisma.articulo.count({
      where: { organizacionId },
    });

    const articulosBajoStock = await this.prisma.inventario.findMany({
      where: {
        sucursal: { organizacionId },
        stockActual: { lte: 5 },
      },
      include: {
        articulo: { select: { nombre: true, codigo: true, precioVenta: true } },
      },
      take: 10,
    });

    // 2. Ventas recientes (hoy y últimos 7 días)
    const inicioHoy = new Date();
    inicioHoy.setHours(0, 0, 0, 0);

    const hace7Dias = new Date();
    hace7Dias.setDate(hace7Dias.getDate() - 7);

    const ventasHoy = await this.prisma.venta.findMany({
      where: {
        sucursal: { organizacionId },
        createdAt: { gte: inicioHoy },
      },
      select: { total: true, metodoPago: true, createdAt: true },
    });

    const totalVendidoHoy = ventasHoy.reduce(
      (acc, v) => acc + Number(v.total || 0),
      0,
    );

    const totalVentasHistoricas = await this.prisma.venta.count({
      where: { sucursal: { organizacionId } },
    });

    // 3. Clientes
    const totalClientes = await this.prisma.cliente.count({
      where: { organizacionId },
    });

    // 4. Último corte de caja
    const ultimoCorte = await this.prisma.corteCaja.findFirst({
      where: { organizacionId },
      orderBy: { createdAt: 'desc' },
      select: { totalVentas: true, diferencia: true, createdAt: true },
    });

    return {
      organizacion: org.nombre,
      metricas: {
        totalArticulos,
        articulosConBajoStock: articulosBajoStock.map((i) => ({
          nombre: i.articulo.nombre,
          codigo: i.articulo.codigo,
          existencia: Number(i.stockActual),
          precio: Number(i.articulo.precioVenta),
        })),
        ventasHoy: {
          conteo: ventasHoy.length,
          totalMxn: totalVendidoHoy,
        },
        totalVentasHistoricas,
        totalClientes,
        ultimoCorte: ultimoCorte
          ? {
              total: Number(ultimoCorte.totalVentas),
              diferencia: Number(ultimoCorte.diferencia),
              fecha: ultimoCorte.createdAt,
            }
          : null,
      },
    };
  }

  /**
   * Consulta interactiva con Gemini (Chat de Asistente IA)
   */
  async chat(
    organizacionId: string,
    mensajeUsuario: string,
    historial: ChatMessage[] = [],
  ) {
    const apiKey = await this.obtenerApiKey(organizacionId);
    const contexto = await this.recopilarContextoNegocio(organizacionId);

    const systemInstruction = `Eres "Inagerlis AI", un consultor ejecutivo de inteligencia de negocios integrado al sistema Inagerlis CRM & POS.
Tu objetivo es analizar los datos operativos del comercio, predecir tendencias, advertir riesgos de inventario, sugerir promociones y responder con precisión estratégica.

ESTRUCTURA DE RESPUESTA:
- Sé conciso, profesional, analítico y directo al grano.
- Emplea formato Markdown elegante (viñetas, números en negrita, tablas si es necesario).
- No inventes datos numéricos. Basa tus conclusiones en la siguiente radiografía real del comercio:

DATOS EN VIVO DEL NEGOCIO "${contexto.organizacion}":
- Catálogo total: ${contexto.metricas.totalArticulos} artículos registrados.
- Ventas de hoy: ${contexto.metricas.ventasHoy.conteo} transacciones por un total de $${contexto.metricas.ventasHoy.totalMxn.toFixed(2)} MXN.
- Total histórico de ventas registradas: ${contexto.metricas.totalVentasHistoricas}.
- Clientes en base de datos: ${contexto.metricas.totalClientes}.
- Productos en alerta de bajo stock: ${JSON.stringify(contexto.metricas.articulosConBajoStock)}.
- Último corte de caja: ${contexto.metricas.ultimoCorte ? JSON.stringify(contexto.metricas.ultimoCorte) : 'Sin cortes recientes'}.`;

    // Armar contenidos para la API de Gemini
    const contents: any[] = [];

    // Historial previo
    for (const h of historial.slice(-6)) {
      contents.push({
        role: h.rol === 'user' ? 'user' : 'model',
        parts: [{ text: h.contenido }],
      });
    }

    // Mensaje actual con contexto
    contents.push({
      role: 'user',
      parts: [
        {
          text: `[INSTRUCCIÓN DEL SISTEMA]:\n${systemInstruction}\n\n[CONSULTA DEL USUARIO]:\n${mensajeUsuario}`,
        },
      ],
    });

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 1200,
            },
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error API Gemini (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const respuestaTexto =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No fue posible generar una respuesta en este momento.';

      // Incrementar contador de uso en configuracionTema
      await this.incrementarUsoIa(organizacionId);

      return {
        respuesta: respuestaTexto,
        contextoResumido: {
          articulos: contexto.metricas.totalArticulos,
          ventasHoy: contexto.metricas.ventasHoy,
          alertasStock: contexto.metricas.articulosConBajoStock.length,
        },
      };
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Error al comunicarse con Gemini: ${error.message}`,
      );
    }
  }

  /**
   * Genera diagnósticos preconfigurados con 1 Clic
   */
  async generarDiagnostico(
    organizacionId: string,
    tipo: 'rendimiento' | 'inventario' | 'demanda' | 'general' = 'general',
  ) {
    const prompts = {
      rendimiento:
        'Realiza una auditoría exhaustiva del rendimiento comercial de hoy, analizando volumen de venta, ticket promedio y recomendaciones para aumentar el margen de utilidad.',
      inventario:
        'Analiza detalladamente los productos con bajo stock, riesgo de desabasto, sugiere órdenes de compra inmediatas y estrategias para evitar pérdida de ventas.',
      demanda:
        'Genera un pronóstico de demanda de mercado para los próximos días, indicando qué categorías promover y qué artículos estacionales preparar.',
      general:
        'Genera un Resumen Ejecutivo Integral de la empresa: diagnóstico de ventas, salud del inventario, cortes de caja y 3 acciones prioritarias para el administrador.',
    };

    return this.chat(organizacionId, prompts[tipo] || prompts.general);
  }

  /**
   * Consulta el estado de configuración de IA para la organización
   */
  async obtenerEstadoIa(organizacionId: string) {
    const org = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
      select: { configuracionTema: true, nombre: true },
    });

    if (!org) {
      throw new NotFoundException('Organización no encontrada');
    }

    const temaConfig = (org.configuracionTema as Record<string, any>) || {};
    const tieneApiKeyPropia = Boolean(
      temaConfig.geminiApiKey && temaConfig.geminiApiKey.length > 10,
    );
    const tieneApiKeyGlobal = Boolean(
      process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 10,
    );

    return {
      disponible: tieneApiKeyPropia || tieneApiKeyGlobal,
      usandoClavePropia: tieneApiKeyPropia,
      limiteConsultas: temaConfig.limiteConsultasIa || 500,
      consultasUsadas: temaConfig.consultasIaUsadas || 0,
      estadoOrganizacion: temaConfig.estadoOrganizacion || 'Activa',
    };
  }

  /**
   * Incrementa el contador de consultas usadas
   */
  private async incrementarUsoIa(organizacionId: string) {
    try {
      const org = await this.prisma.organizacion.findUnique({
        where: { id: organizacionId },
        select: { configuracionTema: true },
      });

      const configActual = (org?.configuracionTema as Record<string, any>) || {};
      const consultasActuales = Number(configActual.consultasIaUsadas || 0) + 1;

      await this.prisma.organizacion.update({
        where: { id: organizacionId },
        data: {
          configuracionTema: {
            ...configActual,
            consultasIaUsadas: consultasActuales,
          },
        },
      });
    } catch (err) {
      // No frenar la respuesta de IA por el contador
    }
  }
}
