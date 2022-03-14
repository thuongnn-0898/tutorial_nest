import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsAlpha, IsEmail, IsNumber, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlpha()
  @MinLength(5)
  @MaxLength(40)
  @IsNotEmpty()
  @Field(() => String)
  first_name: string;

  @IsAlpha()
  @MinLength(5)
  @MaxLength(40)
  @IsNotEmpty()
  @Field(() => String)
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string;

  @MinLength(6)
  @MaxLength(32)
  @IsNotEmpty()
  @Field(() => String)
  password: string;

  @IsNumber()
  @Field(() => Int, { nullable: true })
  age?: number;
}
