import { Test, TestingModule } from '@nestjs/testing';
import { SuscripcionesController } from './suscripciones.controller.js';

describe('SuscripcionesController', () => {
  let controller: SuscripcionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuscripcionesController],
    }).compile();

    controller = module.get<SuscripcionesController>(SuscripcionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
