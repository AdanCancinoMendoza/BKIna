import { Module } from '@nestjs/common';
import { CalendarioService } from './calendario.service.js';
import { CalendarioController } from './calendario.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { WhatsappModule } from '../whatsapp/whatsapp.module.js';

@Module({
  imports: [PrismaModule, WhatsappModule],
  controllers: [CalendarioController],
  providers: [CalendarioService],
  exports: [CalendarioService],
})
export class CalendarioModule {}
