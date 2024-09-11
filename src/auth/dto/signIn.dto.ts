import { IsNotEmpty, Length, IsString } from 'class-validator';

export class signInDto {
  @IsNotEmpty({ message: 'Please enter username' })
  @IsString({ message: 'Please enter valid username' })
  username: string;

  @Length(6, 50, {
    message: 'Password length Must be between 6 and 50 charcters',
  })
  password: string;
}
