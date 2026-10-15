import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProveedorDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  contacto?: string;

  @IsString()
  @IsOptional()
  rfc?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  whatsapp?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  ciudad?: string;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  codigoPostal?: string;

  @IsString()
  @IsOptional()
  categoria?: string;

  @IsNumber()
  @IsOptional()
  diasCredito?: number;

  @IsNumber()
  @IsOptional()
  limiteCredito?: number;

  @IsNumber()
  @IsOptional()
  saldoPendiente?: number;

  @IsString()
  @IsOptional()
  banco?: string;

  @IsString()
  @IsOptional()
  cuentaBancaria?: string;

  @IsString()
  @IsOptional()
  clabe?: string;

  @IsString()
  @IsOptional()
  notas?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
