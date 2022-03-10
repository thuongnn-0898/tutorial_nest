import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserDTO } from 'src/users/dto/user.dto';

@ObjectType()
export class PostDTO {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field(type => [UserDTO])
  user: UserDTO
}
