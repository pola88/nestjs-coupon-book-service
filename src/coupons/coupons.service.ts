import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Coupon } from './entities/coupon.entity';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Code } from './entities/Code.entity';
import { Transactional } from 'sequelize-transactional-decorator';
import { ValidationError } from 'sequelize';
import { parseSequelizeError } from 'src/helper/error';

@Injectable()
export class CouponsService {
  constructor(
    @InjectModel(Coupon)
    private couponRepository: typeof Coupon,
    @InjectModel(Code)
    private codeRepository: typeof Code,
  ) {}

  create(createCouponDto: CreateCouponDto) {
    return this.couponRepository.create(createCouponDto as any);
  }

  findAll() {
    return this.couponRepository.findAll({ include: Code });
  }

  findOne(id: number, options = { include: Code }) {
    return this.couponRepository.findByPk(id, options);
  }

  assignRandomCode(username: string) {

  }

  @Transactional()
  async setCodes(coupon: Coupon, codes: string[]) {
    try {
      await Promise.all(codes.map(code => Code.create({ code, couponId: coupon.id })));

      return this.findOne(coupon.id);
    } catch(error) {
      if (error instanceof ValidationError) {
        throw new BadRequestException(parseSequelizeError(error), { cause: error });
      }

      throw new BadRequestException(error.message, { cause: error });
    }

  }

  @Transactional()
  async createRandomCodes(coupon: Coupon, amount: number) {
    try {
      await Promise.all(
        [...Array(amount)].map(() => {
          const code = (Math.random() + 1).toString(36).substring(7);

          return Code.create({ code, couponId: coupon.id });
        })
      );

      return this.findOne(coupon.id);
    } catch(error) {
      if (error instanceof ValidationError) {
        throw new BadRequestException(parseSequelizeError(error), { cause: error });
      }

      throw new BadRequestException(error.message, { cause: error });
    }
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
