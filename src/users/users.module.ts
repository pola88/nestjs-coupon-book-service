import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IsUserAlreadyExistConstraint } from './validators/is-user-already-exists.validator';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [IsUserAlreadyExistConstraint, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
