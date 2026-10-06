import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegistroOrganizacionDto } from './dto/registro-organizacion.dto.js';
import { getCatalogoSemilla } from './data/catalogos-semilla.js';

@Injectable()
export class OrganizacionesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Registro integral de una Organización / Cuenta de Empresa:
   * 1. Valida unicidad de correos de usuarios.
   * 2. Encripta contraseñas y PINs de acceso rápido.
   * 3. Crea Organización, Sucursal inicial, Administrador, Vendedor (opcional) y Suscripción en una transacción optimizada.
   */
  async registrarEmpresa(dto: RegistroOrganizacionDto) {
    // 1. Validar que el correo del admin no esté registrado
    const adminExistente = await this.prisma.usuario.findUnique({
      where: { email: dto.adminCorreo.toLowerCase().trim() },
    });

    if (adminExistente) {
      throw new ConflictException(
        `El correo ${dto.adminCorreo} ya está registrado para otro usuario.`,
      );
    }

    // 2. Si viene correo de vendedor, validar que sea distinto al del admin y no exista
    if (dto.vendedorCorreo) {
      const vendEmail = dto.vendedorCorreo.toLowerCase().trim();
      if (vendEmail === dto.adminCorreo.toLowerCase().trim()) {
        throw new BadRequestException(
          'El correo del vendedor debe ser diferente al del administrador.',
        );
      }

      const vendedorExistente = await this.prisma.usuario.findUnique({
        where: { email: vendEmail },
      });

      if (vendedorExistente) {
        throw new ConflictException(
          `El correo del vendedor ${dto.vendedorCorreo} ya está registrado.`,
        );
      }
    }

    // 3. Hashear contraseñas y PINs de acceso rápido
    const hashedAdminPassword = await bcrypt.hash(dto.adminPassword, 10);
    const hashedAdminPin = dto.adminPin ? await bcrypt.hash(dto.adminPin.trim(), 10) : null;

    const hashedVendedorPassword = dto.vendedorPassword
      ? await bcrypt.hash(dto.vendedorPassword, 10)
      : null;
    const hashedVendedorPin = dto.vendedorPin
      ? await bcrypt.hash(dto.vendedorPin.trim(), 10)
      : null;

    // 4. Fechas de suscripción
    const fechaInicio = new Date();
    let fechaFin = dto.fechaFin ? new Date(dto.fechaFin) : null;
    if (!fechaFin || isNaN(fechaFin.getTime())) {
      if (dto.plan === 'GRATUITO') {
        // Plan Gratuito: 100 años (permanente / sin caducidad)
        fechaFin = new Date(fechaInicio.getTime() + 36500 * 24 * 60 * 60 * 1000);
      } else {
        // 30 días de periodo por defecto para planes estándar
        fechaFin = new Date(fechaInicio.getTime() + 30 * 24 * 60 * 60 * 1000);
      }
    }

    // 5. Transacción Prisma optimizada con timeout extendido y bulk insert
    return this.prisma.$transaction(
      async (tx: any) => {
        // A) Crear la Organización (activa inmediatamente, sin requerir verificación de correo)
        const organizacion = await tx.organizacion.create({
          data: {
            nombre: dto.nombre.trim(),
            email: dto.correo ? dto.correo.toLowerCase().trim() : null,
            telefono: dto.telefono ? dto.telefono.trim() : null,
            pais: dto.pais ? dto.pais.trim() : 'México',
            estado: dto.estado ? dto.estado.trim() : null,
            municipio: dto.municipio ? dto.municipio.trim() : null,
            codigoPostal: dto.codigoPostal ? dto.codigoPostal.trim() : null,
            direccion: dto.direccion ? dto.direccion.trim() : null,
          },
        });

        // B) Crear la Sucursal inicial
        const sucursal = await tx.sucursal.create({
          data: {
            organizacionId: organizacion.id,
            nombre: dto.sucursalNombre.trim(),
            telefono: dto.sucursalTelefono ? dto.sucursalTelefono.trim() : null,
            direccion: dto.sucursalDireccion ? dto.sucursalDireccion.trim() : null,
            activo: true,
          },
        });

        // C) Crear Terminal por defecto para la sucursal (ej. "Caja 01")
        const terminal = await tx.terminal.create({
          data: {
            sucursalId: sucursal.id,
            nombre: 'Caja 01',
            estado: 'Cerrada',
          },
        });

        // D) Crear Perfiles por defecto para la Organización
        const perfilAdmin = await tx.perfil.create({
          data: {
            organizacionId: organizacion.id,
            nombre: 'Administrador',
            descripcion: 'Control total de módulos y administración del sistema y POS.',
            esAdmin: true,
            activo: true,
            permisos: {
              modulos: {
                inicio: { ver: true },
                clientes: { ver: true, crear: true, editar: true, eliminar: true },
                articulos: { ver: true, crear: true, editar: true, eliminar: true },
                stock: { ver: true, crear: true, editar: true, eliminar: true },
                promociones: { ver: true, crear: true, editar: true, eliminar: true },
                ventas: { ver: true, crear: true, editar: true, eliminar: true },
                caja: { ver: true, abrir: true, cerrar: true },
                tickets: { ver: true, cancelar: true, reimprimir: true },
                reportes: { ver: true },
                usuarios: { ver: true, crear: true, editar: true, eliminar: true },
                configuracion: { ver: true },
              },
              pos: {
                acceso: true,
                aplicarDescuentos: true,
                cancelarVenta: true,
                cambiarPrecios: true,
                abrirCajon: true,
                verCostos: true,
                devoluciones: true,
              },
            },
          },
        });

        const perfilCajero = await tx.perfil.create({
          data: {
            organizacionId: organizacion.id,
            nombre: 'Cajero / Vendedor',
            descripcion: 'Operación en Punto de Venta, atención a clientes y cobros.',
            esAdmin: false,
            activo: true,
            permisos: {
              modulos: {
                inicio: { ver: true },
                clientes: { ver: true, crear: true, editar: false, eliminar: false },
                articulos: { ver: true, crear: false, editar: false, eliminar: false },
                stock: { ver: false, crear: false, editar: false, eliminar: false },
                promociones: { ver: true, crear: false, editar: false, eliminar: false },
                ventas: { ver: true, crear: true, editar: false, eliminar: false },
                caja: { ver: true, abrir: true, cerrar: true },
                tickets: { ver: true, cancelar: false, reimprimir: true },
                reportes: { ver: false },
                usuarios: { ver: false, crear: false, editar: false, eliminar: false },
                configuracion: { ver: false },
              },
              pos: {
                acceso: true,
                aplicarDescuentos: false,
                cancelarVenta: false,
                cambiarPrecios: false,
                abrirCajon: true,
                verCostos: false,
                devoluciones: false,
              },
            },
          },
        });

        // E) Crear Usuario Administrador (activo directamente)
        const admin = await tx.usuario.create({
          data: {
            organizacionId: organizacion.id,
            sucursalId: sucursal.id,
            perfilId: perfilAdmin.id,
            nombre: dto.adminNombre.trim(),
            email: dto.adminCorreo.toLowerCase().trim(),
            telefono: dto.adminTelefono ? dto.adminTelefono.trim() : null,
            password: hashedAdminPassword,
            pin: hashedAdminPin,
            activo: true,
          },
        });

        // F) Crear Usuario Vendedor (si se proporcionaron datos)
        let vendedor: any = null;
        if (
          dto.vendedorNombre &&
          dto.vendedorCorreo &&
          hashedVendedorPassword
        ) {
          vendedor = await tx.usuario.create({
            data: {
              organizacionId: organizacion.id,
              sucursalId: sucursal.id,
              perfilId: perfilCajero.id,
              nombre: dto.vendedorNombre.trim(),
              email: dto.vendedorCorreo.toLowerCase().trim(),
              telefono: dto.vendedorTelefono ? dto.vendedorTelefono.trim() : null,
              password: hashedVendedorPassword,
              pin: hashedVendedorPin,
              activo: true,
            },
          });
        }

        // F) Crear Suscripción
        const suscripcion = await tx.suscripcion.create({
          data: {
            organizacionId: organizacion.id,
            plan: dto.plan ? dto.plan.trim() : 'BASICO',
            estado: 'Activa',
            fechaInicio,
            fechaFin,
          },
        });

        // G) Precargar Catálogo Inicial de Artículos (Bulk Insert optimizado)
        let articulosPrecargadosCount = 0;
        if (dto.precargarArticulos) {
          const catalogo = getCatalogoSemilla(
            dto.pais || organizacion.pais || 'México',
            dto.giroComercial,
          );

          const articulosParaCrear: any[] = [];
          const inventariosParaCrear: any[] = [];

          for (const fam of catalogo) {
            const familiaCreada = await tx.familia.create({
              data: {
                organizacionId: organizacion.id,
                nombre: fam.nombre,
                descripcion: fam.descripcion,
              },
            });

            // Mapa de subfamilias creadas para esta familia (nombre -> id)
            const subfamiliasMap = new Map<string, string>();

            for (const art of fam.articulos) {
              let subfamiliaId: string | null = null;
              if (art.subfamilia) {
                const subfamKey = art.subfamilia.trim();
                if (!subfamiliasMap.has(subfamKey)) {
                  const subfamCreada = await tx.subfamilia.create({
                    data: {
                      familiaId: familiaCreada.id,
                      nombre: subfamKey,
                      descripcion: `Subcategoría de ${fam.nombre}`,
                    },
                  });
                  subfamiliasMap.set(subfamKey, subfamCreada.id);
                }
                subfamiliaId = subfamiliasMap.get(subfamKey) || null;
              }

              const articuloId = randomUUID();

              articulosParaCrear.push({
                id: articuloId,
                organizacionId: organizacion.id,
                familiaId: familiaCreada.id,
                subfamiliaId: subfamiliaId,
                codigo: art.codigo,
                nombre: art.nombre,
                descripcion: art.descripcion || null,
                precioCompra: 0,
                precioVenta: 0,
                unidad: art.unidad || 'Pieza',
                activo: true,
              });

              inventariosParaCrear.push({
                id: randomUUID(),
                sucursalId: sucursal.id,
                articuloId: articuloId,
                stockActual: 0,
                stockMinimo: 0,
                stockMaximo: 0,
              });
            }
          }

          if (articulosParaCrear.length > 0) {
            await tx.articulo.createMany({
              data: articulosParaCrear,
              skipDuplicates: true,
            });

            await tx.inventario.createMany({
              data: inventariosParaCrear,
              skipDuplicates: true,
            });

            articulosPrecargadosCount = articulosParaCrear.length;
          }
        }

        return {
          mensaje: 'Organización registrada exitosamente',
          organizacion: {
            id: organizacion.id,
            nombre: organizacion.nombre,
            email: organizacion.email,
            telefono: organizacion.telefono,
            direccion: organizacion.direccion,
            pais: organizacion.pais,
            estado: organizacion.estado,
            municipio: organizacion.municipio,
            codigoPostal: organizacion.codigoPostal,
            createdAt: organizacion.createdAt,
          },
          sucursal: {
            id: sucursal.id,
            nombre: sucursal.nombre,
            direccion: sucursal.direccion,
            telefono: sucursal.telefono,
            terminalInicial: {
              id: terminal.id,
              nombre: terminal.nombre,
            },
          },
          admin: {
            id: admin.id,
            nombre: admin.nombre,
            email: admin.email,
            telefono: admin.telefono,
            perfilId: admin.perfilId,
            perfilNombre: perfilAdmin.nombre,
          },
          vendedor: vendedor
            ? {
                id: vendedor.id,
                nombre: vendedor.nombre,
                email: vendedor.email,
                telefono: vendedor.telefono,
                perfilId: vendedor.perfilId,
                perfilNombre: perfilCajero.nombre,
              }
            : null,
          suscripcion: {
            id: suscripcion.id,
            plan: suscripcion.plan,
            estado: suscripcion.estado,
            fechaInicio: suscripcion.fechaInicio,
            fechaFin: suscripcion.fechaFin,
          },
          articulosPrecargadosCount,
        };
      },
      {
        maxWait: 30000, // Tiempo máximo de espera para conexión
        timeout: 60000, // Timeout extendido de 60 segundos
      },
    );
  }

  async findAll() {
    return this.prisma.organizacion.findMany({
      include: {
        _count: {
          select: {
            sucursales: true,
            usuarios: true,
            clientes: true,
            ventas: true,
          },
        },
        suscripciones: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const organizacion = await this.prisma.organizacion.findUnique({
      where: { id },
      include: {
        sucursales: {
          include: {
            terminales: true,
            _count: { select: { usuarios: true, ventas: true } },
          },
        },
        usuarios: {
          select: {
            id: true,
            nombre: true,
            email: true,
            telefono: true,
            rol: true,
            activo: true,
            sucursalId: true,
            createdAt: true,
          },
        },
        suscripciones: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!organizacion) {
      throw new NotFoundException('Organización no encontrada');
    }

    return organizacion;
  }
}
