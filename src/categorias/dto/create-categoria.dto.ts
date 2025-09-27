import { Transform } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty({ message: 'El campo descripción no debe estar vacío' })
  @IsString({ message: 'El campo descripción debe ser de tipo cadena' })
  @MaxLength(60, { message: 'El campo descripción no debe exceder los 60 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  descripcion: string;
}
