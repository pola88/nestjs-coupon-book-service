import { Column, Table, Model, HasMany } from 'sequelize-typescript';
import { Code } from './Code.entity';

@Table({
  tableName: 'coupon',
})
export class Coupon extends Model {
  @Column
  name: string;

  @HasMany(() => Code)
  codes: Code[];
}
