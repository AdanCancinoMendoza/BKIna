import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KeepAliveController } from './keep-alive.controller.js';
import { KeepAliveService } from './keep-alive.service.js';

@Module({
  imports: [ConfigModule],
  controllers: [KeepAliveController],
  providers: [KeepAliveService],
  exports: [KeepAliveService],
})
export class KeepAliveModule {}
