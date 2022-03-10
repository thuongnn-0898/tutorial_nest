import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsAlpha, IsEmail, IsNumber, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlpha()
  @MinLength(5)
  @MaxLength(40)
  @IsNotEmpty()
  @Field(type => String)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Field(type => String)
  email: string;

  @IsNumber()
  @Field(type => Int, { nullable: true })
  age?: number;
}
