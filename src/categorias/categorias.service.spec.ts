import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriasService } from './categorias.service';
import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

describe('CategoriasService', () => {
  let service: CategoriasService;
  let repository: Repository<Categoria>;

  const mockCategoria: Categoria = {
    id: 1,
    descripcion: 'Categoría de prueba',
    productos: [],
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriasService,
        {
          provide: getRepositoryToken(Categoria),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
    repository = module.get<Repository<Categoria>>(getRepositoryToken(Categoria));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new categoria', async () => {
      const createCategoriaDto: CreateCategoriaDto = { descripcion: 'Nueva Categoría' };
      mockRepository.create.mockReturnValue(mockCategoria);
      mockRepository.save.mockReturnValue(mockCategoria);

      const result = await service.create(createCategoriaDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createCategoriaDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockCategoria);
      expect(result).toEqual(mockCategoria);
    });
  });

  describe('findAll', () => {
    it('should return an array of categorias', async () => {
      const categorias = [mockCategoria];
      mockRepository.find.mockReturnValue(categorias);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(categorias);
    });
  });

  describe('findOne', () => {
    it('should return a categoria by id', async () => {
      mockRepository.findOneBy.mockReturnValue(mockCategoria);

      const result = await service.findOne(1);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockCategoria);
    });

    it('should throw NotFoundException if categoria not found', async () => {
      mockRepository.findOneBy.mockReturnValue(null);

      await expect(service.findOne(1)).rejects.toThrow('Categoría con ID 1 no encontrada');
    });
  });

  describe('update', () => {
    it('should update a categoria', async () => {
      const updateCategoriaDto: UpdateCategoriaDto = { descripcion: 'Categoría Actualizada' };
      const updatedCategoria = { ...mockCategoria, ...updateCategoriaDto };
      mockRepository.findOneBy.mockReturnValue(mockCategoria);
      mockRepository.save.mockReturnValue(updatedCategoria);

      const result = await service.update(1, updateCategoriaDto);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockRepository.save).toHaveBeenCalledWith(updatedCategoria);
      expect(result).toEqual(updatedCategoria);
    });
  });

  describe('remove', () => {
    it('should remove a categoria', async () => {
      mockRepository.delete.mockReturnValue({ affected: 1 });

      await service.remove(1);

      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
