import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { PostTitleInput } from '../../posts/dto/post-title.input';
import { CreateUserInput } from './create-user.input';

@InputType()
export class CreateUserMultiPostsInput extends CreateUserInput {
  @Field(() => [PostTitleInput])
  @ValidateNested()
  @IsOptional()
  posts: PostTitleInput[];
}
