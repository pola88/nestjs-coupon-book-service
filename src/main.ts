import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { initSequelizeCLS } from 'sequelize-transactional-decorator';

import { AppModule } from './app.module';

async function bootstrap() {
  initSequelizeCLS();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
