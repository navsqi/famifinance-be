// auth.service.ts
import { User } from '@common/database/entities';
import { IJwtPayload } from '@common/interfaces/jwt-payload.interface';
import { JwtService } from '@modules/jwt/jwt.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async login(email: string, password: string) {
    const { manager } = this.dataSource;
    const user = await manager.findOne(User, {
      where: {
        email,
      },
    });

    if (!user || !user?.password || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    delete user?.password;

    const jwtPayload: IJwtPayload = {
      sub: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return {
      result: {
        accessToken: token,
        user,
      },
    };
  }

  async register(payload: RegisterDto) {
    const { manager } = this.dataSource;
    const { email, password, fullName, isActive } = payload;

    const saltRounds = 10;
    const hashedPassword = (password && (await bcrypt.hash(password, saltRounds))) || null;

    const newUser: User = await manager.save(User, {
      email,
      password: hashedPassword,
      fullName,
      isActive,
    });

    delete newUser?.password;

    const jwtPayload: IJwtPayload = {
      sub: newUser.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return {
      result: {
        accessToken: token,
        user: newUser,
      },
    };
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  getUserInfo(id: string) {
    const { manager } = this.dataSource;
    return manager.findOneBy(User, { id });
  }
}
