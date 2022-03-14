import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostDTO } from 'src/posts/dto/post.dto';

@ObjectType()
export class UserDTO {
  @Field(type => String, { nullable: true })
  id: string;

  @Field(type => String, { nullable: true })
  first_name: string;

  @Field(type => String, { nullable: true })
  last_name: string;

  @Field(type => String, { nullable: true })
  full_name: string;

  @Field(type => String, { nullable: true })
  email: string;

  @Field(type => Int, { nullable: true })
  age?: number;

  @Field(type => Date, { nullable: true })
  created_at: Date;

  @Field(type => Date, { nullable: true })
  updated_at: Date;

  @Field(type => [PostDTO], { nullable: true })
  posts?: PostDTO[];
}
