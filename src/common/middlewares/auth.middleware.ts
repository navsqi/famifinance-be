// auth.middleware.ts
import { IUserInfo } from '@common/interfaces';
import { AuthService } from '@modules/auth/auth.service';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    try {
      const { sub, exp, iat } = await this.authService.verifyToken(token);

      const user = await this.authService.getUserInfo(sub);

      if (!user) throw new UnauthorizedException('User not found');

      req['user'] = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        isActive: user.isActive,
      } as IUserInfo;

      next();
    } catch (err) {
      throw new UnauthorizedException(err?.message || 'Invalid token');
    }
  }
}
