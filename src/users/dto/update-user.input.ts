import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;

  @MinLength(6)
  @MaxLength(32)
  @Field(type => String, { nullable: true })
  password: string;
}
