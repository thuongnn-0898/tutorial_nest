import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  userId: string;
}
