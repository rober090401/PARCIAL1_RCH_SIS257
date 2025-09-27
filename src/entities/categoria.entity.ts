import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from '../productos/entities/producto.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @OneToMany(() => Producto, producto => producto.categoria)
  productos: Producto[];
}
