import { IsNotEmpty, IsString } from 'class-validator';

export class AssignRandomCodeDto {
  @IsNotEmpty({ message: 'Please enter a username' })
  @IsString({ message: 'Please enter valid username' })
  username: string;
}
