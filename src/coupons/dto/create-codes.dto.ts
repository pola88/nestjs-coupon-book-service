import { IsArray, IsInt, ValidateIf, IsString, Validate } from 'class-validator';
import { CodeLength } from './code-length';

export class CreateCodesDto {

  @ValidateIf( body => !body.amount)
  @IsArray({ message: 'Please enter valid codes' })
  @IsString({ each: true })
  @Validate(CodeLength, { each: true, message: 'Check the codes. One of them does not have 5 chars' })
  codes?: string[];

  @ValidateIf( body => !body.codes)
  @IsInt()
  amount?: number;
}
