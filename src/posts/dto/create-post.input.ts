import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  @MaxLength(255)
  title: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  user_id: string;
}
