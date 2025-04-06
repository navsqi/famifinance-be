import 'pg';

import { GlobalHttpExceptionFilter } from '@common/exceptions/http-exception.filter';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './modules/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle(configService.swagger.name)
    .setDescription(configService.swagger.description)
    .setVersion(configService.swagger.version)
    .setExternalDoc('OpenAPI JSON', '/docs-json')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token', // 👈 name of the security scheme
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const port = Number(configService.app.port);

  await app.listen(port);

  const logger = new Logger('Bootstrap');

  logger.log(`🚀 App is running on http://localhost:${port}`);
  logger.log(`🚀 Swagger is running on http://localhost:${port}/docs`);
}

void bootstrap();
