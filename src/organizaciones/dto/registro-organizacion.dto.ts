import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegistroOrganizacionDto {
  // Organización
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la organización es obligatorio' })
  nombre: string;

  @IsEmail({}, { message: 'El correo de la organización debe ser válido' })
  @IsOptional()
  correo?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  pais?: string;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  municipio?: string;

  @IsString()
  @IsOptional()
  codigoPostal?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  giroComercial?: string;

  @IsOptional()
  precargarArticulos?: boolean;

  // Sucursal inicial
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la sucursal es obligatorio' })
  sucursalNombre: string;

  @IsString()
  @IsOptional()
  sucursalTelefono?: string;

  @IsString()
  @IsOptional()
  sucursalDireccion?: string;

  // Administrador
  @IsString()
  @IsNotEmpty({ message: 'El nombre del administrador es obligatorio' })
  adminNombre: string;

  @IsString()
  @IsOptional()
  adminTelefono?: string;

  @IsEmail({}, { message: 'El correo del administrador debe ser válido' })
  @IsNotEmpty({ message: 'El correo del administrador es obligatorio' })
  adminCorreo: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña del administrador debe tener al menos 6 caracteres' })
  @IsNotEmpty({ message: 'La contraseña del administrador es obligatoria' })
  adminPassword: string;

  @IsString()
  @IsOptional()
  adminPin?: string;

  // Vendedor (opcional)
  @IsString()
  @IsOptional()
  vendedorNombre?: string;

  @IsString()
  @IsOptional()
  vendedorTelefono?: string;

  @IsEmail({}, { message: 'El correo del vendedor debe ser un email válido' })
  @IsOptional()
  vendedorCorreo?: string;

  @IsString()
  @IsOptional()
  vendedorPassword?: string;

  @IsString()
  @IsOptional()
  vendedorPin?: string;

  // Plan / Membresía
  @IsString()
  @IsOptional()
  plan?: string;

  @IsOptional()
  fechaFin?: string;
}
