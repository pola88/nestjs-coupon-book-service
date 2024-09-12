import { Column, Table, Model, BelongsTo, ForeignKey, DataType, Is, BelongsToMany, IsDate, Default } from 'sequelize-typescript';

import { Coupon } from './coupon.entity';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'codes',
})
export class Code extends Model {

  @Is("CodeLength", value => {
    if (value.length !== 5) {
      throw new Error('Invalid code size (size: 5)');
    }
  })
  @Column
  code: string;

  @ForeignKey(() => Coupon)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  couponId: number;

  @BelongsTo(() => Coupon)
  coupon: Coupon;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Default(0)
  @Column
  redeemed: number;

  @IsDate
  @Column
  loockedUntil: Date;

  async canBeRedeemed() {
    const coupon = this.coupon && await this.$get("coupon");
    return this.redeemed < coupon.redeemedAmount;
  }
}
