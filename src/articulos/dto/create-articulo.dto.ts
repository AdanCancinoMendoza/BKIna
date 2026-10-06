import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateArticuloDto {
  @IsString()
  @IsNotEmpty({ message: 'El código de barras / SKU es obligatorio' })
  codigo: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del artículo es obligatorio' })
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsOptional()
  precioCompra?: number;

  @IsNumber()
  @IsOptional()
  precioVenta?: number;

  @IsString()
  @IsOptional()
  unidad?: string;

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsString()
  @IsOptional()
  familiaId?: string;

  @IsString()
  @IsOptional()
  subfamiliaId?: string;

  @IsString()
  @IsOptional()
  organizacionId?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsNumber()
  @IsOptional()
  stockInicial?: number;

  @IsString()
  @IsOptional()
  sucursalId?: string;
}

export class UpdateArticuloDto {
  @IsString()
  @IsOptional()
  codigo?: string;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsOptional()
  precioCompra?: number;

  @IsNumber()
  @IsOptional()
  precioVenta?: number;

  @IsString()
  @IsOptional()
  unidad?: string;

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsString()
  @IsOptional()
  familiaId?: string;

  @IsString()
  @IsOptional()
  subfamiliaId?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsNumber()
  @IsOptional()
  stockActual?: number;

  @IsString()
  @IsOptional()
  sucursalId?: string;
}
