import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { initSequelizeCLS } from 'sequelize-transactional-decorator';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

async function bootstrap() {
  initSequelizeCLS();
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
