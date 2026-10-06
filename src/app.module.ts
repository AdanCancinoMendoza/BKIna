import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module.js';
import { EventsModule } from './events/events.module.js';
import { SupabaseModule } from './supabase/supabase.module.js';
import { OrganizacionesModule } from './organizaciones/organizaciones.module.js';
import { SucursalesModule } from './sucursales/sucursales.module.js';
import { TerminalesModule } from './terminales/terminales.module.js';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { SuscripcionesModule } from './suscripciones/suscripciones.module.js';
import { VentasModule } from './ventas/ventas.module.js';
import { ClientesModule } from './clientes/clientes.module.js';
import { TicketsModule } from './tickets/tickets.module.js';
import { CajaModule } from './caja/caja.module.js';
import { ArticulosModule } from './articulos/articulos.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    EventsModule,
    SupabaseModule,

    OrganizacionesModule,
    SucursalesModule,
    TerminalesModule,
    UsuariosModule,
    SuscripcionesModule,
    VentasModule,
    ClientesModule,
    TicketsModule,
    CajaModule,
    ArticulosModule,
  ],
})
export class AppModule {}