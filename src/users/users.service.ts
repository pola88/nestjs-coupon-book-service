import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './entities/user.entity';
import { Code } from 'src/coupons/entities/Code.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  create(email: string) {
    const password = User.generatePassword('12345678');
    return this.userRepository.create({
      email,
      password,
    });
  }

  findUserWithCodes(id: number) {
    return this.userRepository.findByPk(id, { include: [Code] });
  }
}
