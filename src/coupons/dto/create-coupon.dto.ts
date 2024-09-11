import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCouponDto {
  @IsNotEmpty({ message: 'Please enter name' })
  @IsString({ message: 'Please enter valid name' })
  name: string;
}
