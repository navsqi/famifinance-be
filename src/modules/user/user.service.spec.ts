/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from '@common/database/entities';
import { getRepositoryToken } from '@nestjs/typeorm';

// Mock data
const mockUsers: User[] = [
  {
    id: 'e0710d7c-947e-4541-9839-b76d7bacd066',
    fullName: 'John Doe',
    email: 'john@example.com',
    isActive: true,
  } as User,
  {
    id: 'b0a6b165-69a5-42ea-90a0-4468e4e61346',
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    isActive: true,
  } as User,
];

// Mock repository
const mockUserRepo = {
  find: jest.fn().mockResolvedValue(mockUsers),
};

describe('UserService', () => {
  let userService: UserService;
  let userRepo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepo).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await userService.findAll();
      expect(result).toEqual(mockUsers);
      expect(userRepo.find).toHaveBeenCalled();
    });
  });
});
