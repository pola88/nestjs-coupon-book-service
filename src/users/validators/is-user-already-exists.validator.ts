import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

import { User } from '../entities/user.entity';

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async validate(email: any, args: ValidationArguments) {
    const user = await this.userRepository.findOne({ where: { email }});
    if (user) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `User already exists`;
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
