import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsUserAlreadyExist } from '../validators/is-user-already-exists.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Please enter email' })
  @IsEmail()
  @IsUserAlreadyExist()
  email: string;
}
