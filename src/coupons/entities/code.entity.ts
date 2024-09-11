import { Column, Table, Model, BelongsTo, ForeignKey, DataType, Is } from 'sequelize-typescript';

import { Coupon } from './coupon.entity';
import { CodeLength } from '../dto/code-length';

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

  @Column
  username: string;
}
