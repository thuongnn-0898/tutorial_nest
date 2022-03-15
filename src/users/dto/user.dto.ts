import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Expose, Transform } from 'class-transformer';
import { PostDTO } from 'src/posts/dto/post.dto';

@ObjectType()
export class UserDTO {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => String, { nullable: true })
  @Expose()
  fullName: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => [PostDTO], { nullable: true })
  posts?: PostDTO[];
}
