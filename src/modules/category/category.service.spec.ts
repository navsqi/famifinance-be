import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { DataSource, EntityManager } from 'typeorm';
import { Category } from '@common/database/entities';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('CategoryService', () => {
  let service: CategoryService;
  let dataSource: DataSource;
  let manager: jest.Mocked<EntityManager>;

  beforeEach(async () => {
    manager = {
      save: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<EntityManager>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: DataSource,
          useValue: {
            manager,
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    dataSource = module.get<DataSource>(DataSource);
  });

  describe('create()', () => {
    it('should create a category and return success response', async () => {
      const dto: CreateCategoryDto = { name: 'Food', description: 'Food category' };
      const mockCategory = { id: '1', ...dto };

      manager.save.mockResolvedValue(mockCategory);

      const result = await service.create(dto);

      expect(manager.save).toHaveBeenCalledWith(Category, dto);
      expect(result).toEqual({
        result: {
          category: mockCategory,
        },
      });
    });
  });

  describe('findAll()', () => {
    it('should return all categories', async () => {
      const mockCategories = [{ id: '1', name: 'Food' }];
      manager.find.mockResolvedValue(mockCategories);

      const result = await service.findAll();

      expect(manager.find).toHaveBeenCalledWith(Category);
      expect(result).toEqual({
        result: {
          categories: mockCategories,
        },
      });
    });
  });

  describe('update()', () => {
    it('should update a category and return success response', async () => {
      const id = '1';
      const dto: UpdateCategoryDto = { name: 'Updated Name' };
      const mockUpdateResult = { affected: 1 };

      manager.update.mockResolvedValue(mockUpdateResult as any);

      const result = await service.update(id, dto);

      expect(manager.update).toHaveBeenCalledWith(Category, { id }, dto);
      expect(result).toEqual({
        result: {
          category: mockUpdateResult,
        },
      });
    });
  });

  describe('remove()', () => {
    it('should delete a category and return success response', async () => {
      const id = '1';
      const mockDeleteResult = { affected: 1 };

      manager.delete.mockResolvedValue(mockDeleteResult as any);

      const result = await service.remove(id);

      expect(manager.delete).toHaveBeenCalledWith(Category, id);
      expect(result).toEqual({
        result: {
          category: mockDeleteResult,
        },
      });
    });
  });
});
