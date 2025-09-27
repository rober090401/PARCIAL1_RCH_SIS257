import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty({ message: 'El campo id_categoria es obligatorio' })
  @IsNumber({}, { message: 'El campo id_categoria debe ser numérico' })
  readonly id_categoria: number;

  @IsNotEmpty({ message: 'El campo código es obligatorio' })
  @IsString({ message: 'El campo código debe ser de tipo cadena' })
  @MaxLength(20, { message: 'El campo código no debe ser mayor a 20 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly codigo: string;

  @IsNotEmpty({ message: 'El campo descripción es obligatorio' })
  @IsString({ message: 'El campo descripción debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo descripción no debe ser mayor a 100 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly descripcion: string;

  @IsOptional()
  @IsDateString({}, { message: 'El campo fecha_vencimiento debe ser una fecha válida' })
  readonly fecha_vencimiento?: string;
}
