// jwt.module.ts
import { Global, Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { ConfigModule } from '@modules/config/config.module';
import { ConfigService } from '@modules/config/config.service';

@Global()
@Module({
  imports: [
    NestJwtModule.registerAsync({
      imports: [ConfigModule], // 👈 needed to inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.jwt.secret,
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
