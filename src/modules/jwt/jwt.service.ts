// jwt.service.ts
import { IJwtPayload } from '@common/interfaces/jwt-payload.interface';
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private jwt: NestJwtService) {}

  sign(payload: IJwtPayload): Promise<string> {
    return this.jwt.signAsync(payload);
  }

  verify(token: string): Promise<IJwtPayload> {
    return this.jwt.verifyAsync(token);
  }
}
