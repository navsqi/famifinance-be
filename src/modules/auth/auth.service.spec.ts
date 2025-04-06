jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

import { User } from '@common/database/entities';
import { JwtService } from '@modules/jwt/jwt.service';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let dataSource: Partial<DataSource>;

  const mockUser: Partial<User> = {
    id: 'user-id',
    email: 'test@example.com',
    password: 'hashed-password',
    fullName: 'Test User',
    isActive: true,
  };

  const mockJwtService = {
    sign: jest.fn().mockResolvedValue('mock-token'),
    verify: jest.fn().mockReturnValue({ sub: 'user-id' }),
  };

  const mockManager = {
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    dataSource = {
      manager: mockManager as any,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return accessToken and user on valid credentials', async () => {
      mockManager.findOne.mockResolvedValue({ ...mockUser });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.login('test@example.com', 'password');

      expect(mockManager.findOne).toHaveBeenCalled();
      expect(mockJwtService.sign).toHaveBeenCalled();
      expect(result).toEqual({
        result: {
          accessToken: 'mock-token',
          user: expect.objectContaining({
            id: 'user-id',
            email: 'test@example.com',
            fullName: 'Test User',
            isActive: true,
          }),
        },
      });
    });

    it('should throw UnauthorizedException on invalid password', async () => {
      mockManager.findOne.mockResolvedValue({ ...mockUser });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login('test@example.com', 'wrongpass')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when user not found', async () => {
      mockManager.findOne.mockResolvedValue(null);

      await expect(authService.login('notfound@example.com', 'password')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('register', () => {
    it('should create user and return token', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      mockManager.save.mockResolvedValue({ ...mockUser });

      const dto = {
        email: 'test@example.com',
        password: '123456',
        fullName: 'Test User',
        isActive: true,
      };

      const result = await authService.register(dto);

      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
      expect(mockManager.save).toHaveBeenCalled();
      expect(result).toEqual({
        result: {
          accessToken: 'mock-token',
          user: expect.objectContaining({
            email: 'test@example.com',
            fullName: 'Test User',
            isActive: true,
          }),
        },
      });
    });
  });

  describe('verifyToken', () => {
    it('should verify token and return payload', () => {
      const result = authService.verifyToken('token');
      expect(result).toEqual({ sub: 'user-id' });
    });
  });

  describe('getUserInfo', () => {
    it('should return user by ID', async () => {
      mockManager.findOneBy.mockResolvedValue(mockUser);

      const result = await authService.getUserInfo('user-id');
      expect(result).toEqual(mockUser);
    });
  });
});
