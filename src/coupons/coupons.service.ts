// eslint-disable-next-line @typescript-eslint/no-require-imports
const moment = require('moment');
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transactional } from 'sequelize-transactional-decorator';
import { Sequelize, ValidationError, Op } from 'sequelize';

import { parseSequelizeError } from 'src/helper/error';
import { Coupon } from './entities/coupon.entity';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { Code } from './entities/Code.entity';
import { User } from 'src/users/entities/user.entity';

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

  async assignRandomCode(user: User) {
    const code = await this.codeRepository.findOne({
      where: {
        userId: null,
        redeemed: null,
        loockedUntil: {
          [Op.or]: {
            [Op.lte]: moment().toDate(),
            [Op.eq]: null,
          },
        },
      },
      order: Sequelize.literal('RANDOM()'),
    });
    await user.$add('code', code);
  }

  async assignCode(code: string, user: User) {
    const _code = await this.codeRepository.findOne({
      where: {
        code,
        userId: null,
        redeemed: null,
        loockedUntil: {
          [Op.or]: {
            [Op.lte]: moment().toDate(),
            [Op.eq]: null,
          },
        },
      },
    });
    if (!_code) {
      throw new BadRequestException('Code not found');
    }

    await user.$add('code', _code);
  }

  async lockCode(code: string, user: User) {
    const _code = await this.codeRepository.findOne({
      where: {
        code,
        userId: user.id,
      },
    });

    if (!_code) {
      throw new BadRequestException(
        'Code not found or was not assigned to the user',
      );
    }

    _code.loockedUntil = moment().add(10, 'minutes').toDate();
    await _code.save();
  }

  async redeemCode(code: string, user: User) {
    const _code = await this.codeRepository.findOne({
      where: {
        code,
        userId: user.id,
        loockedUntil: {
          [Op.lte]: moment().toDate(),
        },
      },
      include: [Coupon],
    });

    if (!_code) {
      throw new BadRequestException(
        'Code not found or was not assigned to the user',
      );
    }

    const canBeRedeemed = await _code.canBeRedeemed();
    if (canBeRedeemed) {
      _code.redeemed += 1;
    } else {
      throw new BadRequestException('Code was already redeemed');
    }

    await _code.save();
  }

  @Transactional()
  async setCodes(coupon: Coupon, codes: string[]) {
    try {
      await Promise.all(
        codes.map((code) => Code.create({ code, couponId: coupon.id })),
      );

      return this.findOne(coupon.id);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestException(parseSequelizeError(error), {
          cause: error,
        });
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
        }),
      );

      return this.findOne(coupon.id);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestException(parseSequelizeError(error), {
          cause: error,
        });
      }

      throw new BadRequestException(error.message, { cause: error });
    }
  }
}
