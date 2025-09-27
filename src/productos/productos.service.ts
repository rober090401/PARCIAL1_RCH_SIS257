import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const existe = await this.productoRepository.findOneBy({
      codigo: createProductoDto.codigo.trim(),
      id_categoria: createProductoDto.id_categoria,
    });
    if (existe) throw new ConflictException('El producto ya existe');

    const productoData: any = {
      id_categoria: createProductoDto.id_categoria,
      categoria: { id: createProductoDto.id_categoria } as any,
      codigo: createProductoDto.codigo,
      descripcion: createProductoDto.descripcion,
    };
    if (createProductoDto.fecha_vencimiento) {
      productoData.fecha_vencimiento = new Date(createProductoDto.fecha_vencimiento);
    }
    const producto = this.productoRepository.create(productoData);
    return this.productoRepository.save(producto) as unknown as Promise<Producto>;
  }

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({ relations: ['categoria'] });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    if (updateProductoDto.id_categoria !== undefined) {
      producto.id_categoria = updateProductoDto.id_categoria;
      producto.categoria = { id: updateProductoDto.id_categoria } as any;
    }
    if (updateProductoDto.fecha_vencimiento !== undefined) {
      producto.fecha_vencimiento = new Date(updateProductoDto.fecha_vencimiento);
    }
    Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(producto);
  }

  async remove(id: number): Promise<Producto> {
    const producto = await this.findOne(id);
    return this.productoRepository.softRemove(producto);
  }
}
