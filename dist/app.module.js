var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map