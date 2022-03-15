import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  @IsString()
  @IsUUID()
  id: string;

  @MinLength(6)
  @MaxLength(32)
  @IsString()
  @Field(() => String, { nullable: true })
  password: string;
}
