import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(type => String)
  @MaxLength(255)
  title: string;

  @Field(type => String)
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
