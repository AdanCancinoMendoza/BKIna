import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'El ID de la organización es obligatorio' })
  organizacionId: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del usuario es obligatorio' })
  nombre: string;

  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;

  @IsString()
  @IsOptional()
  pin?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  sucursalId?: string;

  @IsString()
  @IsNotEmpty({ message: 'El perfil de usuario es obligatorio' })
  perfilId: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}

export class UpdateUsuarioDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  pin?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  sucursalId?: string;

  @IsString()
  @IsOptional()
  perfilId?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
