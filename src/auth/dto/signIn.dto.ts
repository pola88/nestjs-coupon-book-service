import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class signInDto {
  @IsNotEmpty({ message: 'Please enter an email' })
  @IsEmail()
  email: string;

  @Length(6, 50, {
    message: 'Password length Must be between 6 and 50 charcters',
  })
  password: string;
}
