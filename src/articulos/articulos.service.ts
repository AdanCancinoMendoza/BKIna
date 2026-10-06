import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
import { getCatalogoSemilla } from '../organizaciones/data/catalogos-semilla.js';
import { CreateArticuloDto, UpdateArticuloDto } from './dto/create-articulo.dto.js';

@Injectable()
export class ArticulosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async findAll(
    organizacionId?: string,
    search?: string,
    familiaId?: string,
    sucursalId?: string,
  ) {
    if (organizacionId) {
      return this.findByOrganizacion(organizacionId, {
        search,
        familiaId,
        sucursalId,
      });
    }

    const where: any = {};
    if (familiaId) where.familiaId = familiaId;
    if (search) {
      const q = search.trim();
      where.OR = [
        { nombre: { contains: q, mode: 'insensitive' } },
        { codigo: { contains: q, mode: 'insensitive' } },
        { descripcion: { contains: q, mode: 'insensitive' } },
      ];
    }

    return this.prisma.articulo.findMany({
      where,
      include: {
        familia: true,
        subfamilia: true,
        inventarios: true,
      },
      orderBy: { nombre: 'asc' },
    });
  }

  async findByOrganizacion(
    organizacionId: string,
    params?: {
      search?: string;
      familiaId?: string;
      subfamiliaId?: string;
      sucursalId?: string;
      activo?: boolean;
    },
  ) {
    const where: any = {
      organizacionId,
    };

    if (params?.activo !== undefined) {
      where.activo = params.activo;
    }

    if (params?.familiaId) {
      where.familiaId = params.familiaId;
    }

    if (params?.subfamiliaId) {
      where.subfamiliaId = params.subfamiliaId;
    }

    if (params?.search) {
      const q = params.search.trim();
      where.OR = [
        { nombre: { contains: q, mode: 'insensitive' } },
        { codigo: { contains: q, mode: 'insensitive' } },
        { descripcion: { contains: q, mode: 'insensitive' } },
      ];
    }

    const articulos = await this.prisma.articulo.findMany({
      where,
      include: {
        familia: {
          select: { id: true, nombre: true },
        },
        subfamilia: {
          select: { id: true, nombre: true },
        },
        inventarios: {
          select: {
            id: true,
            sucursalId: true,
            stockActual: true,
            stockMinimo: true,
            stockMaximo: true,
            sucursal: {
              select: { id: true, nombre: true },
            },
          },
        },
      },
      orderBy: { nombre: 'asc' },
    });

    return articulos.map((art) => {
      const totalStock = art.inventarios.reduce((acc, inv) => acc + inv.stockActual, 0);
      const stockSucursal = params?.sucursalId
        ? art.inventarios.find((i) => i.sucursalId === params.sucursalId)?.stockActual ?? 0
        : totalStock;

      return {
        ...art,
        precioCompra: Number(art.precioCompra),
        precioVenta: Number(art.precioVenta),
        stock: stockSucursal,
        totalStock,
      };
    });
  }

  async findBySucursal(sucursalId: string, search?: string) {
    const sucursal = await this.prisma.sucursal.findUnique({
      where: { id: sucursalId },
      select: { organizacionId: true },
    });

    if (!sucursal) {
      throw new NotFoundException('Sucursal no encontrada');
    }

    return this.findByOrganizacion(sucursal.organizacionId, {
      sucursalId,
      search,
      activo: true,
    });
  }

  async findByCodigo(organizacionId: string, codigo: string) {
    const articulo = await this.prisma.articulo.findFirst({
      where: {
        organizacionId,
        codigo: codigo.trim(),
      },
      include: {
        familia: true,
        subfamilia: true,
        inventarios: {
          include: {
            sucursal: {
              select: { id: true, nombre: true },
            },
          },
        },
      },
    });

    if (!articulo) {
      throw new NotFoundException(`Artículo con código ${codigo} no encontrado`);
    }

    return {
      ...articulo,
      precioCompra: Number(articulo.precioCompra),
      precioVenta: Number(articulo.precioVenta),
    };
  }

  async findOne(id: string) {
    const articulo = await this.prisma.articulo.findUnique({
      where: { id },
      include: {
        familia: true,
        subfamilia: true,
        inventarios: {
          include: { sucursal: true },
        },
      },
    });

    if (!articulo) {
      throw new NotFoundException('Artículo no encontrado');
    }

    return {
      ...articulo,
      precioCompra: Number(articulo.precioCompra),
      precioVenta: Number(articulo.precioVenta),
    };
  }

  async create(dto: CreateArticuloDto, organizacionId?: string) {
    const orgId = organizacionId || dto.organizacionId;
    if (!orgId) {
      throw new BadRequestException('El ID de organización es requerido');
    }

    const existe = await this.prisma.articulo.findFirst({
      where: {
        organizacionId: orgId,
        codigo: dto.codigo.trim(),
      },
    });

    if (existe) {
      throw new ConflictException(`Ya existe un artículo con el código ${dto.codigo}`);
    }

    const nuevoArticulo = await this.prisma.articulo.create({
      data: {
        organizacionId: orgId,
        codigo: dto.codigo.trim(),
        nombre: dto.nombre.trim(),
        descripcion: dto.descripcion?.trim() || null,
        precioCompra: dto.precioCompra ?? 0,
        precioVenta: dto.precioVenta ?? 0,
        unidad: dto.unidad?.trim() || 'Pieza',
        imagen: dto.imagen || null,
        familiaId: dto.familiaId || null,
        subfamiliaId: dto.subfamiliaId || null,
        activo: dto.activo ?? true,
      },
      include: {
        familia: true,
        subfamilia: true,
        inventarios: true,
      },
    });

    // Crear inventario inicial en las sucursales de la organización
    const sucursales = await this.prisma.sucursal.findMany({
      where: { organizacionId: orgId },
      select: { id: true },
    });

    if (sucursales.length > 0) {
      await this.prisma.inventario.createMany({
        data: sucursales.map((suc) => ({
          sucursalId: suc.id,
          articuloId: nuevoArticulo.id,
          stockActual: suc.id === dto.sucursalId ? (dto.stockInicial ?? 0) : 0,
          stockMinimo: 0,
          stockMaximo: 0,
        })),
        skipDuplicates: true,
      });
    }

    // Emitir evento Socket.io
    this.eventsGateway.emitirArticuloCreado(nuevoArticulo);

    return {
      ...nuevoArticulo,
      precioCompra: Number(nuevoArticulo.precioCompra),
      precioVenta: Number(nuevoArticulo.precioVenta),
    };
  }

  async update(id: string, dto: UpdateArticuloDto) {
    const articulo = await this.prisma.articulo.findUnique({
      where: { id },
    });

    if (!articulo) {
      throw new NotFoundException('Artículo no encontrado');
    }

    const data: any = {};
    if (dto.nombre !== undefined) data.nombre = dto.nombre.trim();
    if (dto.codigo !== undefined) data.codigo = dto.codigo.trim();
    if (dto.descripcion !== undefined) data.descripcion = dto.descripcion?.trim() || null;
    if (dto.precioCompra !== undefined) data.precioCompra = dto.precioCompra;
    if (dto.precioVenta !== undefined) data.precioVenta = dto.precioVenta;
    if (dto.unidad !== undefined) data.unidad = dto.unidad.trim();
    if (dto.imagen !== undefined) data.imagen = dto.imagen;
    if (dto.familiaId !== undefined) data.familiaId = dto.familiaId || null;
    if (dto.subfamiliaId !== undefined) data.subfamiliaId = dto.subfamiliaId || null;
    if (dto.activo !== undefined) data.activo = dto.activo;

    const actualizado = await this.prisma.articulo.update({
      where: { id },
      data,
      include: {
        familia: true,
        subfamilia: true,
        inventarios: true,
      },
    });

    // Actualizar stock de inventario si viene en el payload
    if (dto.stockActual !== undefined && dto.sucursalId) {
      const invExistente = actualizado.inventarios.find((i) => i.sucursalId === dto.sucursalId);
      if (invExistente) {
        await this.prisma.inventario.update({
          where: { id: invExistente.id },
          data: { stockActual: dto.stockActual },
        });
      } else {
        await this.prisma.inventario.create({
          data: {
            sucursalId: dto.sucursalId,
            articuloId: id,
            stockActual: dto.stockActual,
          },
        });
      }

      this.eventsGateway.emitirStockActualizado({
        articuloId: id,
        sucursalId: dto.sucursalId,
        nuevoStock: dto.stockActual,
      });
    }

    const resultado = {
      ...actualizado,
      precioCompra: Number(actualizado.precioCompra),
      precioVenta: Number(actualizado.precioVenta),
    };

    // Emitir evento Socket.io
    this.eventsGateway.emitirArticuloActualizado(resultado);

    return resultado;
  }

  async delete(id: string) {
    const articulo = await this.prisma.articulo.findUnique({
      where: { id },
    });

    if (!articulo) {
      throw new NotFoundException('Artículo no encontrado');
    }

    await this.prisma.articulo.delete({
      where: { id },
    });

    // Emitir evento Socket.io
    this.eventsGateway.emitirArticuloEliminado(id);

    return { mensaje: 'Artículo eliminado correctamente', id };
  }

  async remove(id: string) {
    return this.delete(id);
  }

  async precargarCatalogo(dto: {
    organizacionId: string;
    pais?: string;
    giroComercial?: string;
  }) {
    const org = await this.prisma.organizacion.findUnique({
      where: { id: dto.organizacionId },
      include: { sucursales: true },
    });

    if (!org) {
      throw new NotFoundException('Organización no encontrada');
    }

    const catalogo = getCatalogoSemilla(
      dto.pais || org.pais || 'México',
      dto.giroComercial,
    );

    const sucursalPrincipalId = org.sucursales?.[0]?.id;
    const articulosParaCrear: any[] = [];
    const inventariosParaCrear: any[] = [];

    // 1. Obtener familias existentes para no duplicar
    const familiasExistentes = await this.prisma.familia.findMany({
      where: { organizacionId: org.id },
      include: { subfamilias: true },
    });

    const familiasMap = new Map<string, string>();
    const subfamiliasMap = new Map<string, string>();

    for (const f of familiasExistentes) {
      familiasMap.set(f.nombre.toLowerCase().trim(), f.id);
      for (const sf of f.subfamilias) {
        subfamiliasMap.set(`${f.id}_${sf.nombre.toLowerCase().trim()}`, sf.id);
      }
    }

    // 2. Iterar catálogo semilla
    for (const fam of catalogo) {
      const famKey = fam.nombre.toLowerCase().trim();
      let familiaId = familiasMap.get(famKey);

      if (!familiaId) {
        const nuevaFam = await this.prisma.familia.create({
          data: {
            organizacionId: org.id,
            nombre: fam.nombre,
            descripcion: fam.descripcion,
          },
        });
        familiaId = nuevaFam.id;
        familiasMap.set(famKey, familiaId);
      }

      for (const art of fam.articulos) {
        let subfamiliaId: string | null = null;
        if (art.subfamilia) {
          const sfKey = `${familiaId}_${art.subfamilia.toLowerCase().trim()}`;
          subfamiliaId = subfamiliasMap.get(sfKey) || null;

          if (!subfamiliaId) {
            const nuevaSub = await this.prisma.subfamilia.create({
              data: {
                familiaId,
                nombre: art.subfamilia.trim(),
                descripcion: `Subcategoría de ${fam.nombre}`,
              },
            });
            subfamiliaId = nuevaSub.id;
            subfamiliasMap.set(sfKey, subfamiliaId);
          }
        }

        const articuloId = randomUUID();
        articulosParaCrear.push({
          id: articuloId,
          organizacionId: org.id,
          familiaId,
          subfamiliaId,
          codigo: art.codigo,
          nombre: art.nombre,
          descripcion: art.descripcion || null,
          precioCompra: 0,
          precioVenta: 0,
          unidad: art.unidad || 'Pieza',
          activo: true,
        });

        if (sucursalPrincipalId) {
          inventariosParaCrear.push({
            id: randomUUID(),
            sucursalId: sucursalPrincipalId,
            articuloId,
            stockActual: 0,
            stockMinimo: 0,
            stockMaximo: 0,
          });
        }
      }
    }

    if (articulosParaCrear.length > 0) {
      await this.prisma.articulo.createMany({
        data: articulosParaCrear,
        skipDuplicates: true,
      });

      if (inventariosParaCrear.length > 0) {
        await this.prisma.inventario.createMany({
          data: inventariosParaCrear,
          skipDuplicates: true,
        });
      }
    }

    // Emitir evento por Socket.io
    this.eventsGateway.emitirCatalogoPrecargado({
      organizacionId: org.id,
      count: articulosParaCrear.length,
    });

    return {
      mensaje: `Catálogo precargado exitosamente con ${articulosParaCrear.length} artículos sugeridos.`,
      articulosCount: articulosParaCrear.length,
    };
  }

  async buscarImagenes(query: string) {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const q = query.trim();
    const resultados: Array<{ title: string; url: string; thumb: string; source: string }> = [];

    try {
      const offUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        q,
      )}&search_simple=1&action=process&json=1&page_size=8`;

      const offRes = await fetch(offUrl, {
        headers: { 'User-Agent': 'CRM-POS-App/1.0' },
      });

      if (offRes.ok) {
        const offData = await offRes.json();
        if (Array.isArray(offData.products)) {
          for (const prod of offData.products) {
            const imgUrl = prod.image_front_url || prod.image_url;
            const thumbUrl = prod.image_small_url || prod.image_front_small_url || imgUrl;
            if (imgUrl) {
              resultados.push({
                title: prod.product_name || q,
                url: imgUrl,
                thumb: thumbUrl,
                source: 'Open Food Facts',
              });
            }
          }
        }
      }
    } catch {
      // Silently continue
    }

    try {
      const wikiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
        q,
      )}&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=400&format=json&origin=*`;

      const wikiRes = await fetch(wikiUrl);
      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        if (wikiData?.query?.pages) {
          for (const pageId of Object.keys(wikiData.query.pages)) {
            const page = wikiData.query.pages[pageId];
            const info = page.imageinfo?.[0];
            if (info?.url && !info.url.endsWith('.svg') && !info.url.endsWith('.ogg')) {
              resultados.push({
                title: page.title ? page.title.replace('File:', '') : q,
                url: info.url,
                thumb: info.thumburl || info.url,
                source: 'Wikimedia',
              });
            }
          }
        }
      }
    } catch {
      // Continue
    }

    const unique = new Map<string, { title: string; url: string; thumb: string; source: string }>();
    for (const item of resultados) {
      if (!unique.has(item.url)) {
        unique.set(item.url, item);
      }
    }

    return Array.from(unique.values()).slice(0, 16);
  }

  async getFamilias(organizacionId: string) {
    return this.prisma.familia.findMany({
      where: { organizacionId },
      include: {
        subfamilias: true,
        _count: {
          select: { articulos: true },
        },
      },
      orderBy: { nombre: 'asc' },
    });
  }

  async getStats(organizacionId: string) {
    const [total, activos, familias, inventarios] = await Promise.all([
      this.prisma.articulo.count({ where: { organizacionId } }),
      this.prisma.articulo.count({ where: { organizacionId, activo: true } }),
      this.prisma.familia.count({ where: { organizacionId } }),
      this.prisma.inventario.findMany({
        where: { articulo: { organizacionId } },
        select: { stockActual: true, stockMinimo: true },
      }),
    ]);

    const sinStock = inventarios.filter((i) => i.stockActual <= 0).length;
    const stockBajo = inventarios.filter((i) => i.stockActual > 0 && i.stockActual <= i.stockMinimo).length;

    return {
      total,
      activos,
      familias,
      sinStock,
      stockBajo,
    };
  }
}
