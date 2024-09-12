import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Coupon } from './entities/coupon.entity';
import { Code } from './entities/Code.entity';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { UsersModule } from '../users/users.module';
import { IsUserExistsConstraint } from './validators/is-user-exists.validator';

@Module({
  imports: [UsersModule, SequelizeModule.forFeature([Coupon, Code])],
  controllers: [CouponsController],
  providers: [IsUserExistsConstraint, CouponsService],
})
export class CouponsModule {}
