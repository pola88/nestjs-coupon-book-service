import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCouponDto {
  @IsNotEmpty({ message: 'Please enter name' })
  @IsString({ message: 'Please enter valid name' })
  name: string;

  @IsNotEmpty({ message: 'Please enter how many times the codes can be redeemed' })
  @IsInt({ message: 'Please enter valid redeembedAmount' })
  redeemedAmount: number;
}
