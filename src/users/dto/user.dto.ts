import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostDTO } from 'src/posts/dto/post.dto';

@ObjectType()
export class UserDTO {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  first_name: string;

  @Field(() => String, { nullable: true })
  last_name: string;

  @Field(() => String, { nullable: true })
  full_name: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => Date, { nullable: true })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;

  @Field(() => [PostDTO], { nullable: true })
  posts?: PostDTO[];
}
