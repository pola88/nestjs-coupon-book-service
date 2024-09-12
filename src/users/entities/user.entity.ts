// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require('bcrypt');

import { Column, Table, Model, Unique, HasMany } from 'sequelize-typescript';
import { Exclude, Transform } from 'class-transformer';

import { Code } from 'src/coupons/entities/Code.entity';

const saltRounds = 10;

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Unique
  @Column
  email: string;

  @Exclude()
  @Column
  password: string;

  @Transform(({ value }) => value.code)
  @HasMany(() => Code)
  codes: Code[];

  static generatePassword(password: string) {
    return bcrypt.hashSync(password, saltRounds);
  }

  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
