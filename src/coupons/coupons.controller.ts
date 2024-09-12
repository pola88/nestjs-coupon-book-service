import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { AssignCodeDto } from './dto/assign-code.dto';
import { CreateCodesDto } from './dto/create-codes.dto';
import { UsersService } from 'src/users/users.service';

@Controller('coupons')
export class CouponsController {
  constructor(
    private readonly couponsService: CouponsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @Post(':id/codes')
  async createCodes(
    @Param('id') id: number,
    @Body() createCodesDto: CreateCodesDto,
  ) {
    const coupon = await this.couponsService.findOne(id, null);
    if (!coupon) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (createCodesDto.codes?.length) {
      return this.couponsService.setCodes(coupon, createCodesDto.codes);
    }

    return this.couponsService.createRandomCodes(coupon, createCodesDto.amount);
  }

  @Post('assign')
  async assignRandom(@Body() assignCodeDto: AssignCodeDto) {
    const user = await this.userService.findOne(assignCodeDto.email);
    await this.couponsService.assignRandomCode(user);
    return this.userService.findUserWithCodes(user.id);
  }

  @Post('assign/:code')
  async assignCode(
    @Param('code') code: string,
    @Body() assignCodeDto: AssignCodeDto,
  ) {
    const user = await this.userService.findOne(assignCodeDto.email);
    await this.couponsService.assignCode(code, user);
    return this.userService.findUserWithCodes(user.id);
  }

  @Post('lock/:code')
  async lockCode(
    @Param('code') code: string,
    @Body() assignCodeDto: AssignCodeDto,
  ) {
    const user = await this.userService.findOne(assignCodeDto.email);
    await this.couponsService.lockCode(code, user);
  }

  @Post('redeem/:code')
  async redeemCode(
    @Param('code') code: string,
    @Body() assignCodeDto: AssignCodeDto,
  ) {
    const user = await this.userService.findOne(assignCodeDto.email);
    await this.couponsService.redeemCode(code, user);
  }

  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponsService.findOne(+id);
  }
}
