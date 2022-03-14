import { InputType, PickType } from '@nestjs/graphql';
import { CreatePostInput } from './create-post.input';

@InputType()
export class PostTitleInput extends PickType(CreatePostInput, ['title'] as const) { }
