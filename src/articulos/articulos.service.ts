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
        necesitaBascula: Boolean(dto.necesitaBascula),
        stockIlimitado: Boolean(dto.stockIlimitado),
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
    if (dto.necesitaBascula !== undefined) data.necesitaBascula = Boolean(dto.necesitaBascula);
    if (dto.stockIlimitado !== undefined) data.stockIlimitado = Boolean(dto.stockIlimitado);
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

  async createFamilia(
    organizacionId: string,
    data: { nombre: string; descripcion?: string },
  ) {
    if (!organizacionId) {
      throw new BadRequestException('El ID de organización es obligatorio');
    }
    if (!data.nombre?.trim()) {
      throw new BadRequestException('El nombre de la familia es obligatorio');
    }

    const existe = await this.prisma.familia.findFirst({
      where: {
        organizacionId,
        nombre: { equals: data.nombre.trim(), mode: 'insensitive' },
      },
      include: {
        subfamilias: true,
        _count: { select: { articulos: true } },
      },
    });

    if (existe) {
      return existe;
    }

    return this.prisma.familia.create({
      data: {
        organizacionId,
        nombre: data.nombre.trim(),
        descripcion: data.descripcion?.trim() || null,
      },
      include: {
        subfamilias: true,
        _count: { select: { articulos: true } },
      },
    });
  }

  async createSubfamilia(data: {
    familiaId: string;
    nombre: string;
    descripcion?: string;
  }) {
    if (!data.familiaId || !data.nombre?.trim()) {
      throw new BadRequestException('Familia y nombre son obligatorios');
    }

    const familia = await this.prisma.familia.findUnique({
      where: { id: data.familiaId },
    });

    if (!familia) {
      throw new NotFoundException('Familia no encontrada');
    }

    const existe = await this.prisma.subfamilia.findFirst({
      where: {
        familiaId: data.familiaId,
        nombre: { equals: data.nombre.trim(), mode: 'insensitive' },
      },
    });

    if (existe) {
      return existe;
    }

    return this.prisma.subfamilia.create({
      data: {
        familiaId: data.familiaId,
        nombre: data.nombre.trim(),
        descripcion: data.descripcion?.trim() || null,
      },
    });
  }

  async deleteFamilia(id: string) {
    const familia = await this.prisma.familia.findUnique({ where: { id } });
    if (!familia) {
      throw new NotFoundException('Familia no encontrada');
    }

    await this.prisma.familia.delete({ where: { id } });
    return { mensaje: 'Familia eliminada correctamente', id };
  }

  async deleteSubfamilia(id: string) {
    const sub = await this.prisma.subfamilia.findUnique({ where: { id } });
    if (!sub) {
      throw new NotFoundException('Subfamilia no encontrada');
    }

    await this.prisma.subfamilia.delete({ where: { id } });
    return { mensaje: 'Subfamilia eliminada correctamente', id };
  }

  async getUnidades(organizacionId?: string) {
    let orgId = organizacionId;
    if (!orgId) {
      const firstOrg = await this.prisma.organizacion.findFirst({ select: { id: true } });
      orgId = firstOrg?.id;
    }

    if (!orgId) {
      return this.prisma.unidadMedida.findMany({
        orderBy: { nombre: 'asc' },
      });
    }

    const org = await this.prisma.organizacion.findUnique({
      where: { id: orgId },
    });

    if (!org) {
      return this.prisma.unidadMedida.findMany({
        where: { organizacionId: null },
        orderBy: { nombre: 'asc' },
      });
    }

    const count = await this.prisma.unidadMedida.count({
      where: {
        OR: [{ organizacionId }, { organizacionId: null }],
      },
    });

    if (count === 0) {
      const semillas = [
        { nombre: 'Pieza', abreviatura: 'Pza', tipo: 'conteo', necesitaBascula: false, descripcion: 'Unidad estándar indivisible por artículo o producto unitario.' },
        { nombre: 'Kilogramo', abreviatura: 'Kg', tipo: 'peso', necesitaBascula: true, descripcion: 'Medida estándar para venta pesable a granel en báscula e impresión de etiquetas.' },
        { nombre: 'Gramo', abreviatura: 'g', tipo: 'peso', necesitaBascula: true, descripcion: 'Subunidad de peso para especias, semillas y porciones pesables.' },
        { nombre: 'Litro', abreviatura: 'L', tipo: 'volumen', necesitaBascula: false, descripcion: 'Medida de volumen para bebidas, aceites y químicos.' },
        { nombre: 'Mililitro', abreviatura: 'ml', tipo: 'volumen', necesitaBascula: false, descripcion: 'Subunidad de volumen para productos líquidos pequeños.' },
        { nombre: 'Paquete', abreviatura: 'Pqt', tipo: 'empaque', necesitaBascula: false, descripcion: 'Empaque agrupador que contiene múltiples artículos.' },
        { nombre: 'Caja', abreviatura: 'Cja', tipo: 'empaque', necesitaBascula: false, descripcion: 'Embalaje comercial mayorista o presentación agrupada.' },
        { nombre: 'Docena', abreviatura: 'Doc', tipo: 'conteo', necesitaBascula: false, descripcion: 'Agrupación fija de 12 unidades por lote comercial.' },
        { nombre: 'Metro', abreviatura: 'm', tipo: 'longitud', necesitaBascula: false, descripcion: 'Medida lineal para telas, cables, mangueras y tubos.' },
      ];

      await this.prisma.unidadMedida.createMany({
        data: semillas.map((s) => ({
          ...s,
          organizacionId,
        })),
        skipDuplicates: true,
      });
    }

    return this.prisma.unidadMedida.findMany({
      where: {
        OR: [{ organizacionId }, { organizacionId: null }],
      },
      orderBy: { nombre: 'asc' },
    });
  }

  async createUnidad(
    organizacionId: string,
    data: {
      nombre: string;
      abreviatura: string;
      descripcion?: string;
      tipo?: string;
      necesitaBascula?: boolean;
    },
  ) {
    if (!organizacionId) {
      throw new BadRequestException('El ID de organización es obligatorio');
    }
    if (!data.nombre?.trim() || !data.abreviatura?.trim()) {
      throw new BadRequestException('El nombre y la abreviatura son requeridos');
    }

    const org = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
    });

    if (!org) {
      throw new NotFoundException('Organización no encontrada');
    }

    const existe = await this.prisma.unidadMedida.findFirst({
      where: {
        organizacionId,
        nombre: { equals: data.nombre.trim(), mode: 'insensitive' },
      },
    });

    if (existe) {
      return this.prisma.unidadMedida.update({
        where: { id: existe.id },
        data: {
          abreviatura: data.abreviatura.trim(),
          descripcion: data.descripcion?.trim() || null,
          tipo: data.tipo?.trim() || 'conteo',
          necesitaBascula: Boolean(data.necesitaBascula),
        },
      });
    }

    return this.prisma.unidadMedida.create({
      data: {
        organizacionId,
        nombre: data.nombre.trim(),
        abreviatura: data.abreviatura.trim(),
        descripcion: data.descripcion?.trim() || null,
        tipo: data.tipo?.trim() || 'conteo',
        necesitaBascula: Boolean(data.necesitaBascula),
      },
    });
  }

  async deleteUnidad(id: string) {
    const unidad = await this.prisma.unidadMedida.findUnique({ where: { id } });
    if (!unidad) {
      throw new NotFoundException('Unidad de medida no encontrada');
    }

    await this.prisma.unidadMedida.delete({ where: { id } });
    return { mensaje: 'Unidad de medida eliminada correctamente', id };
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

  async getInventarioOverview(organizacionId: string, sucursalId?: string) {
    let org = null;
    if (organizacionId) {
      org = await this.prisma.organizacion.findUnique({ where: { id: organizacionId } });
    }
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    const resolvedOrgId = org?.id || organizacionId;

    const [sucursales, articulos] = await Promise.all([
      this.prisma.sucursal.findMany({
        where: { organizacionId: resolvedOrgId },
        select: { id: true, nombre: true, direccion: true },
        orderBy: { nombre: 'asc' },
      }),
      this.prisma.articulo.findMany({
        where: { organizacionId: resolvedOrgId },
        include: {
          familia: { select: { id: true, nombre: true } },
          subfamilia: { select: { id: true, nombre: true } },
          inventarios: {
            include: {
              sucursal: { select: { id: true, nombre: true } },
            },
          },
        },
        orderBy: { nombre: 'asc' },
      }),
    ]);

    let totalUnidades = 0;
    let valorTotalCosto = 0;
    let valorTotalVenta = 0;
    let articulosAgotados = 0;
    let articulosStockBajo = 0;
    let articulosOptimos = 0;
    let articulosSobrestock = 0;

    const familiaStatsMap = new Map<
      string,
      { nombre: string; unidades: number; valorCosto: number; valorVenta: number; articulosCount: number }
    >();

    const articulosDetalle = articulos.map((art) => {
      let stockActual = 0;
      let stockMinimo = 5;
      let stockMaximo = 100;

      if (sucursalId) {
        const invSuc = art.inventarios.find((i) => i.sucursalId === sucursalId);
        stockActual = invSuc?.stockActual ?? 0;
        stockMinimo = invSuc?.stockMinimo ?? 5;
        stockMaximo = invSuc?.stockMaximo ?? 100;
      } else {
        stockActual = art.inventarios.reduce((acc, i) => acc + i.stockActual, 0);
        if (art.inventarios.length > 0) {
          stockMinimo = art.inventarios[0].stockMinimo;
          stockMaximo = art.inventarios[0].stockMaximo;
        }
      }

      const precioCompra = Number(art.precioCompra || 0);
      const precioVenta = Number(art.precioVenta || 0);
      const costoVal = stockActual * precioCompra;
      const ventaVal = stockActual * precioVenta;

      totalUnidades += stockActual;
      valorTotalCosto += costoVal;
      valorTotalVenta += ventaVal;

      let estado: 'AGOTADO' | 'BAJO' | 'OPTIMO' | 'SOBRESTOCK' = 'OPTIMO';
      if (art.stockIlimitado) {
        estado = 'OPTIMO';
        articulosOptimos++;
      } else if (stockActual <= 0) {
        estado = 'AGOTADO';
        articulosAgotados++;
      } else if (stockActual <= stockMinimo) {
        estado = 'BAJO';
        articulosStockBajo++;
      } else if (stockMaximo > 0 && stockActual > stockMaximo) {
        estado = 'SOBRESTOCK';
        articulosSobrestock++;
      } else {
        estado = 'OPTIMO';
        articulosOptimos++;
      }

      const famNombre = art.familia?.nombre || 'Sin Familia';
      const famEntry = familiaStatsMap.get(famNombre) || {
        nombre: famNombre,
        unidades: 0,
        valorCosto: 0,
        valorVenta: 0,
        articulosCount: 0,
      };
      famEntry.unidades += stockActual;
      famEntry.valorCosto += costoVal;
      famEntry.valorVenta += ventaVal;
      famEntry.articulosCount++;
      familiaStatsMap.set(famNombre, famEntry);

      return {
        id: art.id,
        codigo: art.codigo,
        nombre: art.nombre,
        descripcion: art.descripcion,
        precioCompra,
        precioVenta,
        unidad: art.unidad,
        necesitaBascula: art.necesitaBascula,
        stockIlimitado: art.stockIlimitado,
        activo: art.activo,
        imagen: art.imagen,
        familia: art.familia,
        subfamilia: art.subfamilia,
        stockActual,
        stockMinimo,
        stockMaximo,
        costoVal,
        ventaVal,
        estado,
        inventarios: art.inventarios,
      };
    });

    const gananciaPotencial = valorTotalVenta - valorTotalCosto;
    const margenPromedio = valorTotalVenta > 0 ? (gananciaPotencial / valorTotalVenta) * 100 : 0;

    const porFamilia = Array.from(familiaStatsMap.values()).sort((a, b) => b.unidades - a.unidades);

    const porEstado = [
      { name: 'Óptimo', cantidad: articulosOptimos, color: '#10B981' },
      { name: 'Stock Bajo', cantidad: articulosStockBajo, color: '#F59E0B' },
      { name: 'Agotado', cantidad: articulosAgotados, color: '#EF4444' },
      { name: 'Sobrestock', cantidad: articulosSobrestock, color: '#6366F1' },
    ];

    const articulosCriticos = [...articulosDetalle]
      .filter((a) => a.estado === 'AGOTADO' || a.estado === 'BAJO')
      .sort((a, b) => a.stockActual - b.stockActual)
      .slice(0, 8);

    const topStock = [...articulosDetalle]
      .sort((a, b) => b.stockActual - a.stockActual)
      .slice(0, 8);

    return {
      kpis: {
        totalArticulos: articulos.length,
        totalUnidades,
        valorTotalCosto,
        valorTotalVenta,
        gananciaPotencial,
        margenPromedio,
        articulosAgotados,
        articulosStockBajo,
        articulosOptimos,
        articulosSobrestock,
      },
      porFamilia,
      porEstado,
      articulosCriticos,
      topStock,
      sucursales,
      articulos: articulosDetalle,
    };
  }

  async registrarMovimientoStock(dto: {
    organizacionId: string;
    articuloId: string;
    sucursalId?: string;
    tipo: 'ENTRADA' | 'SALIDA' | 'AJUSTE';
    cantidad: number;
    nuevoStock?: number;
    motivo?: string;
    usuarioId?: string;
  }) {
    let org = null;
    if (dto.organizacionId) {
      org = await this.prisma.organizacion.findUnique({ where: { id: dto.organizacionId } });
    }
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    const resolvedOrgId = org?.id || dto.organizacionId;

    let sucId = dto.sucursalId;
    if (!sucId) {
      const suc = await this.prisma.sucursal.findFirst({ where: { organizacionId: resolvedOrgId } });
      sucId = suc?.id;
    }
    if (!sucId) {
      const nuevaSuc = await this.prisma.sucursal.create({
        data: {
          organizacionId: resolvedOrgId,
          nombre: 'Sucursal Principal',
          direccion: 'Matriz',
        },
      });
      sucId = nuevaSuc.id;
    }

    let inv = await this.prisma.inventario.findUnique({
      where: {
        sucursalId_articuloId: {
          sucursalId: sucId,
          articuloId: dto.articuloId,
        },
      },
    });

    if (!inv) {
      inv = await this.prisma.inventario.create({
        data: {
          sucursalId: sucId,
          articuloId: dto.articuloId,
          stockActual: 0,
          stockMinimo: 5,
          stockMaximo: 100,
        },
      });
    }

    const cantidadOperacion = Math.max(0, Number(dto.cantidad || 0));
    let nuevoStockFinal = inv.stockActual;

    if (dto.tipo === 'ENTRADA') {
      nuevoStockFinal = inv.stockActual + cantidadOperacion;
    } else if (dto.tipo === 'SALIDA') {
      nuevoStockFinal = Math.max(0, inv.stockActual - cantidadOperacion);
    } else if (dto.tipo === 'AJUSTE') {
      if (dto.nuevoStock !== undefined && dto.nuevoStock !== null) {
        nuevoStockFinal = Math.max(0, Number(dto.nuevoStock));
      } else {
        nuevoStockFinal = cantidadOperacion;
      }
    }

    const diferencia = nuevoStockFinal - inv.stockActual;

    const [updatedInv, movimiento] = await this.prisma.$transaction([
      this.prisma.inventario.update({
        where: { id: inv.id },
        data: { stockActual: nuevoStockFinal },
        include: {
          articulo: { select: { id: true, nombre: true, codigo: true, unidad: true } },
          sucursal: { select: { id: true, nombre: true } },
        },
      }),
      this.prisma.movimientoStock.create({
        data: {
          articuloId: dto.articuloId,
          sucursalId: sucId,
          usuarioId: dto.usuarioId || null,
          tipo: dto.tipo as any,
          cantidad: Math.abs(diferencia),
          motivo: dto.motivo || `Ajuste manual de inventario (${dto.tipo})`,
        },
        include: {
          articulo: { select: { id: true, nombre: true, codigo: true, unidad: true } },
          sucursal: { select: { id: true, nombre: true } },
          usuario: { select: { id: true, nombre: true, email: true } },
        },
      }),
    ]);

    // Notificar en tiempo real por WebSockets
    this.eventsGateway.emitirStockActualizado({
      articuloId: dto.articuloId,
      sucursalId: sucId,
      nuevoStock: nuevoStockFinal,
    });
    this.eventsGateway.emitirMovimientoStock(movimiento);

    return {
      exito: true,
      nuevoStock: nuevoStockFinal,
      diferencia,
      inventario: updatedInv,
      movimiento,
    };
  }

  async getMovimientosStock(
    organizacionId: string,
    params?: { articuloId?: string; sucursalId?: string; tipo?: string; limit?: number },
  ) {
    let org = null;
    if (organizacionId) {
      org = await this.prisma.organizacion.findUnique({ where: { id: organizacionId } });
    }
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    const resolvedOrgId = org?.id || organizacionId;

    const where: any = {
      articulo: { organizacionId: resolvedOrgId },
    };

    if (params?.articuloId) where.articuloId = params.articuloId;
    if (params?.sucursalId) where.sucursalId = params.sucursalId;
    if (params?.tipo && params.tipo !== 'TODOS') where.tipo = params.tipo;

    return this.prisma.movimientoStock.findMany({
      where,
      include: {
        articulo: { select: { id: true, nombre: true, codigo: true, unidad: true, precioVenta: true } },
        sucursal: { select: { id: true, nombre: true } },
        usuario: { select: { id: true, nombre: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: params?.limit || 50,
    });
  }

  async updateLimitesStock(
    articuloId: string,
    dto: { sucursalId?: string; stockMinimo: number; stockMaximo: number },
  ) {
    const min = Math.max(0, Number(dto.stockMinimo ?? 5));
    const max = Math.max(min, Number(dto.stockMaximo ?? 100));

    if (dto.sucursalId) {
      await this.prisma.inventario.updateMany({
        where: { articuloId, sucursalId: dto.sucursalId },
        data: { stockMinimo: min, stockMaximo: max },
      });
    } else {
      await this.prisma.inventario.updateMany({
        where: { articuloId },
        data: { stockMinimo: min, stockMaximo: max },
      });
    }

    return { exito: true, stockMinimo: min, stockMaximo: max };
  }
}
