import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from '@common/database/entities';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('AccountController', () => {
  let controller: AccountController;
  let service: jest.Mocked<AccountService>;

  beforeEach(async () => {
    const mockService: Partial<jest.Mocked<AccountService>> = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    service = module.get(AccountService);
  });

  describe('create', () => {
    it('should call service.create and return result', async () => {
      const dto: CreateAccountDto = { accountName: 'Food', description: 'Meals' };
      const mockResponse = {
        result: { account: dto as Account },
      };

      service.create.mockResolvedValue(mockResponse);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findAll', () => {
    it('should return all accounts from service', async () => {
      const mockResponse = {
        result: { accounts: [] },
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
      const dto: UpdateAccountDto = { accountName: 'Updated' };
      const updatedResult: UpdateResult = {
        affected: 1,
        generatedMaps: [],
        raw: null,
      };
      const mockResponse = {
        result: { account: updatedResult },
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
        result: { account: deletedResult },
      };

      service.remove.mockResolvedValue(mockResponse);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockResponse);
    });
  });
});
