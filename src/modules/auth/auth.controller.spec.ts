import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should call AuthService.login with correct credentials', async () => {
      const dto: LoginDto = {
        email: 'user@example.com',
        password: 'secret123',
      };

      const expectedResult = {
        result: {
          accessToken: 'mock-token',
          user: { id: '123', email: dto.email },
        },
      };

      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await authController.login(dto);

      expect(authService.login).toHaveBeenCalledWith(dto.email, dto.password);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('register', () => {
    it('should call AuthService.register with correct payload', async () => {
      const dto: RegisterDto = {
        email: 'user@example.com',
        password: 'secret123',
        fullName: 'John Doe',
        isActive: true,
      };

      const expectedResult = {
        result: {
          accessToken: 'mock-token',
          user: { id: '123', email: dto.email },
        },
      };

      mockAuthService.register.mockResolvedValue(expectedResult);

      const result = await authController.register(dto);

      expect(authService.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });
});
