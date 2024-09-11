import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import bcrypt from 'bcrypt';

import { User } from './entities/user.entity';


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
      email, password,
    })
  }
}