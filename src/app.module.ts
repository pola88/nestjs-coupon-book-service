import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
// import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule } from '@nestjs/config';
// import { RedisLockModule } from 'nestjs-simple-redis-lock';
import { SequelizeTransactionalModule } from 'sequelize-transactional-decorator';

import { dataBaseConfig } from './database/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CouponsModule } from './coupons/coupons.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UsersModule,
    CouponsModule,
    SequelizeModule.forRoot(dataBaseConfig),
    SequelizeTransactionalModule.register(),
    // RedisModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     config: {
    //       host: config.get('REDIS_HOST'),
    //       port: config.get('REDIS_PORT'),
    //       db: parseInt(config.get('REDIS_DB'), 10),
    //       password: config.get('REDIS_PASSWORD'),
    //     }
    //   }),
    // }),
    // RedisLockModule.register({}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
