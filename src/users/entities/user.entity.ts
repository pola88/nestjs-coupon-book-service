const bcrypt = require('bcrypt');
import { Column, Table, Model } from 'sequelize-typescript';

const saltRounds = 10;

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Column
  email: string;

  @Column
  password: string;

  static generatePassword(password: string) {
    return bcrypt.hashSync(password, saltRounds);
  }

  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
