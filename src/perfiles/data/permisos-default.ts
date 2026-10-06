export interface ModuloPermisos {
  ver: boolean;
  crear?: boolean;
  editar?: boolean;
  eliminar?: boolean;
  abrir?: boolean;
  cerrar?: boolean;
  cancelar?: boolean;
  reimprimir?: boolean;
}

export interface PermisosEstructura {
  modulos: {
    inicio: { ver: boolean };
    clientes: { ver: boolean; crear: boolean; editar: boolean; eliminar: boolean };
    articulos: { ver: boolean; crear: boolean; editar: boolean; eliminar: boolean };
    stock: { ver: boolean; crear: boolean; editar: boolean; eliminar: boolean };
    promociones: { ver: boolean; crear: boolean; editar: boolean; eliminar: boolean };
    ventas: { ver: boolean; crear: boolean; editar: boolean; eliminar: boolean };
    caja: { ver: boolean; abrir: boolean; cerrar: boolean };
    tickets: { ver: boolean; cancelar: boolean; reimprimir: boolean };
    reportes: { ver: boolean };
    usuarios: { ver: boolean; crear: boolean; editar: boolean; eliminar: boolean };
    configuracion: { ver: boolean };
  };
  pos: {
    acceso: boolean;
    aplicarDescuentos: boolean;
    cancelarVenta: boolean;
    cambiarPrecios: boolean;
    abrirCajon: boolean;
    verCostos: boolean;
    devoluciones: boolean;
  };
}

export const PLANTILLA_PERMISOS_DEFAULT: PermisosEstructura = {
  modulos: {
    inicio: { ver: true },
    clientes: { ver: true, crear: false, editar: false, eliminar: false },
    articulos: { ver: true, crear: false, editar: false, eliminar: false },
    stock: { ver: false, crear: false, editar: false, eliminar: false },
    promociones: { ver: false, crear: false, editar: false, eliminar: false },
    ventas: { ver: true, crear: true, editar: false, eliminar: false },
    caja: { ver: true, abrir: false, cerrar: false },
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
    abrirCajon: false,
    verCostos: false,
    devoluciones: false,
  },
};

export const PERMISOS_ADMINISTRADOR: PermisosEstructura = {
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
};

export const PERMISOS_CAJERO: PermisosEstructura = {
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
};

export const PERMISOS_VENDEDOR: PermisosEstructura = {
  modulos: {
    inicio: { ver: true },
    clientes: { ver: true, crear: true, editar: true, eliminar: false },
    articulos: { ver: true, crear: false, editar: false, eliminar: false },
    stock: { ver: true, crear: false, editar: false, eliminar: false },
    promociones: { ver: true, crear: false, editar: false, eliminar: false },
    ventas: { ver: true, crear: true, editar: false, eliminar: false },
    caja: { ver: false, abrir: false, cerrar: false },
    tickets: { ver: true, cancelar: false, reimprimir: true },
    reportes: { ver: false },
    usuarios: { ver: false, crear: false, editar: false, eliminar: false },
    configuracion: { ver: false },
  },
  pos: {
    acceso: true,
    aplicarDescuentos: true,
    cancelarVenta: false,
    cambiarPrecios: false,
    abrirCajon: false,
    verCostos: false,
    devoluciones: false,
  },
};
