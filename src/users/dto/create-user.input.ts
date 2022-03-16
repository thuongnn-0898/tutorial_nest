import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsNumber, MaxLength, MinLength, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @MinLength(5)
  @MaxLength(40)
  @IsNotEmpty()
  @Field(() => String)
  firstName: string;

  @IsString()
  @MinLength(5)
  @MaxLength(40)
  @IsNotEmpty()
  @Field(() => String)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  email: string;

  @MinLength(6)
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string;

  @IsNumber()
  @Field(() => Int, { nullable: true })
  age?: number;
}
