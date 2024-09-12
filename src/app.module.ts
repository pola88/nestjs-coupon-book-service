import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { dataBaseConfig } from './database/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CouponsModule } from './coupons/coupons.module';
import { SequelizeTransactionalModule } from 'sequelize-transactional-decorator';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CouponsModule,
    SequelizeModule.forRoot(dataBaseConfig),
    SequelizeTransactionalModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
