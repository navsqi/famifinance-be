import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { DataSource, EntityManager } from 'typeorm';
import { Account } from '@common/database/entities';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AccountService', () => {
  let service: AccountService;
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
        AccountService,
        {
          provide: DataSource,
          useValue: {
            manager,
          },
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    dataSource = module.get<DataSource>(DataSource);
  });

  describe('create()', () => {
    it('should create a account and return success response', async () => {
      const dto: CreateAccountDto = { accountName: 'Food', description: 'Food account' };
      const mockAccount = { id: '1', ...dto };

      manager.save.mockResolvedValue(mockAccount);

      const result = await service.create(dto);

      expect(manager.save).toHaveBeenCalledWith(Account, dto);
      expect(result).toEqual({
        result: {
          account: mockAccount,
        },
      });
    });
  });

  describe('findAll()', () => {
    it('should return all accounts', async () => {
      const mockCategories = [{ id: '1', accountName: 'Food' }];
      manager.find.mockResolvedValue(mockCategories);

      const result = await service.findAll();

      expect(manager.find).toHaveBeenCalledWith(Account);
      expect(result).toEqual({
        result: {
          accounts: mockCategories,
        },
      });
    });
  });

  describe('update()', () => {
    it('should update a account and return success response', async () => {
      const id = '1';
      const dto: UpdateAccountDto = { accountName: 'Updated Name' };
      const mockUpdateResult = { affected: 1 };

      manager.update.mockResolvedValue(mockUpdateResult as any);

      const result = await service.update(id, dto);

      expect(manager.update).toHaveBeenCalledWith(Account, { id }, dto);
      expect(result).toEqual({
        result: {
          account: mockUpdateResult,
        },
      });
    });
  });

  describe('remove()', () => {
    it('should delete a account and return success response', async () => {
      const id = '1';
      const mockDeleteResult = { affected: 1 };

      manager.delete.mockResolvedValue(mockDeleteResult as any);

      const result = await service.remove(id);

      expect(manager.delete).toHaveBeenCalledWith(Account, id);
      expect(result).toEqual({
        result: {
          account: mockDeleteResult,
        },
      });
    });
  });
});
