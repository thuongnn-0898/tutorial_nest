import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { UserDTO } from 'src/users/dto/user.dto';

@ObjectType()
export class PostDTO {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  title: string;

  @Field(type => String)
  @IsUUID()
  userId?: string;

  @Field(type => UserDTO)
  user: UserDTO
}
