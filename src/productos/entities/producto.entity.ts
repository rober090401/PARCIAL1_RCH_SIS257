import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from '../../entities/categoria.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  id_categoria: number;

  @ManyToOne(() => Categoria, categoria => categoria.productos, { nullable: false })
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  @Column({ type: 'varchar', length: 50 })
  codigo: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @Column({ type: 'timestamp', nullable: true })
  fecha_vencimiento: Date;
}
