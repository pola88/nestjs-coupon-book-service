import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'CodeLength', async: false })
export class CodeLength implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return text.length === 5;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) is too short or too long!';
  }
}