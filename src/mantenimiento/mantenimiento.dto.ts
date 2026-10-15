import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MantenimientoAuthDto {
  @IsString()
  @IsNotEmpty()
  organizacionId: string;

  @IsString()
  @IsNotEmpty()
  claveAdmin: string;

  @IsString()
  @IsOptional()
  usuarioId?: string;
}
