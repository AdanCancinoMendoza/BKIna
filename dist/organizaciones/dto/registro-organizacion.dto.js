var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
export class RegistroOrganizacionDto {
    nombre;
    correo;
    telefono;
    pais;
    estado;
    municipio;
    codigoPostal;
    direccion;
    giroComercial;
    precargarArticulos;
    sucursalNombre;
    sucursalTelefono;
    sucursalDireccion;
    adminNombre;
    adminTelefono;
    adminCorreo;
    adminPassword;
    adminPin;
    vendedorNombre;
    vendedorTelefono;
    vendedorCorreo;
    vendedorPassword;
    vendedorPin;
    plan;
    fechaFin;
}
__decorate([
    IsString(),
    IsNotEmpty({ message: 'El nombre de la organización es obligatorio' }),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "nombre", void 0);
__decorate([
    IsEmail({}, { message: 'El correo de la organización debe ser válido' }),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "correo", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "telefono", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "pais", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "estado", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "municipio", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "codigoPostal", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "direccion", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "giroComercial", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", Boolean)
], RegistroOrganizacionDto.prototype, "precargarArticulos", void 0);
__decorate([
    IsString(),
    IsNotEmpty({ message: 'El nombre de la sucursal es obligatorio' }),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "sucursalNombre", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "sucursalTelefono", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "sucursalDireccion", void 0);
__decorate([
    IsString(),
    IsNotEmpty({ message: 'El nombre del administrador es obligatorio' }),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "adminNombre", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "adminTelefono", void 0);
__decorate([
    IsEmail({}, { message: 'El correo del administrador debe ser válido' }),
    IsNotEmpty({ message: 'El correo del administrador es obligatorio' }),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "adminCorreo", void 0);
__decorate([
    IsString(),
    MinLength(6, { message: 'La contraseña del administrador debe tener al menos 6 caracteres' }),
    IsNotEmpty({ message: 'La contraseña del administrador es obligatoria' }),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "adminPassword", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "adminPin", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "vendedorNombre", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "vendedorTelefono", void 0);
__decorate([
    IsEmail({}, { message: 'El correo del vendedor debe ser un email válido' }),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "vendedorCorreo", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "vendedorPassword", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "vendedorPin", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "plan", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", String)
], RegistroOrganizacionDto.prototype, "fechaFin", void 0);
//# sourceMappingURL=registro-organizacion.dto.js.map