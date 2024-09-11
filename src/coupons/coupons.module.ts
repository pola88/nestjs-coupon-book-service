import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Coupon } from './entities/coupon.entity';
import { Code } from './entities/Code.entity';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';

@Module({
  imports: [SequelizeModule.forFeature([Coupon, Code])],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
