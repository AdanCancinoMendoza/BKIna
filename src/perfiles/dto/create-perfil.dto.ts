import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreatePerfilDto {
  @IsString()
  @IsNotEmpty({ message: 'El ID de la organización es obligatorio' })
  organizacionId: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del perfil es obligatorio' })
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsBoolean()
  @IsOptional()
  esAdmin?: boolean;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsObject()
  @IsNotEmpty({ message: 'La estructura de permisos es obligatoria' })
  permisos: any;
}

export class UpdatePerfilDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsBoolean()
  @IsOptional()
  esAdmin?: boolean;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsObject()
  @IsOptional()
  permisos?: any;
}
