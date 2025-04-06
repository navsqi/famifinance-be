import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '@common/database/entities';

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

// Mock service
const mockUserService = {
  findAll: jest.fn().mockResolvedValue(mockUsers),
};

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users from the service', async () => {
      const result = await userController.findAll();
      expect(result).toEqual(mockUsers);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });
});
