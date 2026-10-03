import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}

export class LoginPerfilDto {
  @IsString()
  @IsNotEmpty({ message: 'El ID de usuario es obligatorio' })
  usuarioId: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña o PIN es obligatorio' })
  password: string;
}
