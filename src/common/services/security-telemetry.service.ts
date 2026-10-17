import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

export interface IncidenteSeguridad {
  id: string;
  ip: string;
  tipo:
    | 'FUERZA_BRUTA_LOGIN'
    | 'EXCESO_PETICIONES'
    | 'ACCESO_NO_AUTORIZADO'
    | 'INTENTO_DESTRUCCION'
    | 'ABUSO_IA'
    | 'SONDEO_MALICIOSO';
  ruta: string;
  detalles: string;
  timestamp: string;
  intentos: number;
  bloqueada: boolean;
  nivelRiesgo: 'CRITICO' | 'ALTO' | 'MEDIO';
}

export interface IpSospechosa {
  ip: string;
  primeraDeteccion: string;
  ultimoIntento: string;
  intentosTotales: number;
  bloqueadaHasta: number | null;
  nivelRiesgo: 'CRITICO' | 'ALTO' | 'MEDIO';
  motivo: string;
  rutasAfectadas: string[];
}

@Injectable()
export class SecurityTelemetryService {
  // Almacenamiento en memoria para IPS sospechosas y registros
  private static ips = new Map<string, IpSospechosa>();
  private static incidentes: IncidenteSeguridad[] = [];
  private static totalAtaquesBloqueados = 0;
  private static readonly MAX_INCIDENTES_HISTORIAL = 120;

  // Límite configurable
  private static readonly MAX_INTENTOS_POR_VENTANA = 6;
  private static readonly VENTANA_MS = 60 * 1000; // 1 minuto
  private static readonly BLOQUEO_DURACION_MS = 5 * 60 * 1000; // 5 minutos de bloqueo

  /**
   * Evalúa y registra el intento de acceso desde una IP sobre una ruta sensible
   */
  public static evaluarAcceso(
    ip: string,
    rutaLimpia: string,
    tipo: IncidenteSeguridad['tipo'] = 'EXCESO_PETICIONES',
    detallesCustom?: string,
  ): { permitido: boolean; segundosRestantes: number } {
    const now = Date.now();
    let registro = SecurityTelemetryService.ips.get(ip);

    if (!registro) {
      registro = {
        ip,
        primeraDeteccion: new Date().toISOString(),
        ultimoIntento: new Date().toISOString(),
        intentosTotales: 1,
        bloqueadaHasta: null,
        nivelRiesgo: 'MEDIO',
        motivo: detallesCustom || 'Peticiones frecuentes en ruta sensible',
        rutasAfectadas: [rutaLimpia],
      };
      SecurityTelemetryService.ips.set(ip, registro);
      return { permitido: true, segundosRestantes: 0 };
    }

    // Si ya está bloqueada activamente
    if (registro.bloqueadaHasta && now < registro.bloqueadaHasta) {
      registro.intentosTotales += 1;
      registro.ultimoIntento = new Date().toISOString();
      const segundosRestantes = Math.ceil((registro.bloqueadaHasta - now) / 1000);
      return { permitido: false, segundosRestantes };
    }

    // Si el bloqueo anterior ya expiró, reactivar conteo suave
    if (registro.bloqueadaHasta && now >= registro.bloqueadaHasta) {
      registro.bloqueadaHasta = null;
      registro.intentosTotales = 1;
    } else {
      registro.intentosTotales += 1;
    }

    registro.ultimoIntento = new Date().toISOString();
    if (!registro.rutasAfectadas.includes(rutaLimpia)) {
      registro.rutasAfectadas.push(rutaLimpia);
    }

    // Verificar si sobrepasa el umbral
    if (registro.intentosTotales > SecurityTelemetryService.MAX_INTENTOS_POR_VENTANA) {
      registro.bloqueadaHasta = now + SecurityTelemetryService.BLOQUEO_DURACION_MS;
      registro.nivelRiesgo =
        tipo === 'INTENTO_DESTRUCCION' || tipo === 'FUERZA_BRUTA_LOGIN'
          ? 'CRITICO'
          : 'ALTO';
      registro.motivo =
        detallesCustom ||
        `Excedió límite de seguridad (${registro.intentosTotales} peticiones en ${rutaLimpia})`;

      SecurityTelemetryService.totalAtaquesBloqueados += 1;

      // Registrar incidente en bitácora
      SecurityTelemetryService.registrarIncidente({
        id: randomUUID(),
        ip,
        tipo,
        ruta: rutaLimpia,
        detalles: registro.motivo,
        timestamp: new Date().toISOString(),
        intentos: registro.intentosTotales,
        bloqueada: true,
        nivelRiesgo: registro.nivelRiesgo,
      });

      const segundosRestantes = Math.ceil(SecurityTelemetryService.BLOQUEO_DURACION_MS / 1000);
      return { permitido: false, segundosRestantes };
    }

    return { permitido: true, segundosRestantes: 0 };
  }

  /**
   * Registra manualmente un incidente de seguridad anómalo (ej. intento de borrado no autorizado)
   */
  public static registrarIncidente(incidente: IncidenteSeguridad) {
    this.incidentes.unshift(incidente);
    if (this.incidentes.length > this.MAX_INCIDENTES_HISTORIAL) {
      this.incidentes.pop();
    }
  }

  /**
   * Obtiene la telemetría consolidada para el panel de administración
   */
  public static obtenerTelemetria() {
    const now = Date.now();
    const listaIps = Array.from(this.ips.values()).map((item) => {
      const estaBloqueada = Boolean(item.bloqueadaHasta && now < item.bloqueadaHasta);
      return {
        ...item,
        bloqueada: estaBloqueada,
        segundosRestantes: estaBloqueada && item.bloqueadaHasta
          ? Math.max(0, Math.ceil((item.bloqueadaHasta - now) / 1000))
          : 0,
      };
    });

    // Ordenar: primero las bloqueadas activamente, luego por mayor número de intentos
    listaIps.sort((a, b) => {
      if (a.bloqueada && !b.bloqueada) return -1;
      if (!a.bloqueada && b.bloqueada) return 1;
      return b.intentosTotales - a.intentosTotales;
    });

    const ipsBloqueadasActivas = listaIps.filter((i) => i.bloqueada).length;

    return {
      estadoEscudo: ipsBloqueadasActivas > 0 ? 'DEFENSA_ACTIVA' : 'OPTIMO',
      totalAtaquesBloqueados: this.totalAtaquesBloqueados,
      ipsBajoVigilancia: listaIps.length,
      ipsBloqueadasActivas,
      ips: listaIps.slice(0, 50),
      incidentesRecientes: this.incidentes.slice(0, 30),
    };
  }

  /**
   * Desbloquea una IP manualmente desde el panel de SuperAdmin
   */
  public static desbloquearIp(ip: string): boolean {
    const registro = this.ips.get(ip);
    if (registro) {
      registro.bloqueadaHasta = null;
      registro.intentosTotales = 0;
      return true;
    }
    return false;
  }
}
