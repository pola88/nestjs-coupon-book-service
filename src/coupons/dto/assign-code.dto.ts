import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsUserExists } from '../validators/is-user-exists.validator';

export class AssignCodeDto {
  @IsNotEmpty({ message: 'Please enter an email' })
  @IsEmail()
  @IsUserExists()
  email: string;
}
