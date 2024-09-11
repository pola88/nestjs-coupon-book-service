import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { AssignRandomCodeDto } from './dto/assign-random-code.dto';
import { CreateCodesDto } from './dto/create-codes.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @Post(":id/codes")
  async createCodes(@Param('id') id: number, @Body() createCodesDto: CreateCodesDto) {
    const coupon = await this.couponsService.findOne(id, null);
    if (!coupon) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (createCodesDto.codes?.length) {
      return this.couponsService.setCodes(coupon, createCodesDto.codes);
    }

    return this.couponsService.createRandomCodes(coupon, createCodesDto.amount);
  }

  @Post("assign")
  async assignRandom(@Body() assignRandomCodeDto: AssignRandomCodeDto) {
    return this.couponsService.assignRandomCode(assignRandomCodeDto.username);
  }

  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
  //   return this.couponsService.update(+id, updateCouponDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.couponsService.remove(+id);
  // }
}
