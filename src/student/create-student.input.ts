import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsDateString } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @MinLength(3)
  @Field()
  firstName: string;

  @MinLength(3)
  @Field()
  lastName: string;
}