import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PostTitleInput } from '../../posts/dto/post-title.input';
import { CreateUserInput } from './create-user.input';

@InputType()
export class CreateUserMultiPostsInput extends CreateUserInput {
  @ValidateNested({ each: true })
  @Type(() => PostTitleInput)
  @Field(() => [PostTitleInput])
  @IsOptional()
  posts: PostTitleInput[];
}
