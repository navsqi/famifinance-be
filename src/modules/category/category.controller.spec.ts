import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@common/database/entities';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: jest.Mocked<CategoryService>;

  beforeEach(async () => {
    const mockService: Partial<jest.Mocked<CategoryService>> = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get(CategoryService);
  });

  describe('create', () => {
    it('should call service.create and return result', async () => {
      const dto: CreateCategoryDto = { name: 'Food', description: 'Meals' };
      const mockResponse = {
        result: { category: dto as Category },
      };

      service.create.mockResolvedValue(mockResponse);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findAll', () => {
    it('should return all categories from service', async () => {
      const mockResponse = {
        result: { categories: [] },
      };

      service.findAll.mockResolvedValue(mockResponse);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should call service.update with ID and DTO', async () => {
      const id = '1';
      const dto: UpdateCategoryDto = { name: 'Updated' };
      const updatedResult: UpdateResult = {
        affected: 1,
        generatedMaps: [],
        raw: null,
      };
      const mockResponse = {
        result: { category: updatedResult },
      };

      service.update.mockResolvedValue(mockResponse);

      const result = await controller.update(id, dto);

      expect(service.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('remove', () => {
    it('should call service.remove with ID', async () => {
      const id = '1';
      const deletedResult: DeleteResult = {
        affected: 1,
        raw: null,
      };
      const mockResponse = {
        result: { category: deletedResult },
      };

      service.remove.mockResolvedValue(mockResponse);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockResponse);
    });
  });
});
