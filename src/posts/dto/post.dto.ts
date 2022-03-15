import { ObjectType, Field, Int } from '@nestjs/graphql';

import { IsUUID } from 'class-validator';
import { UserDTO } from '../../users/dto/user.dto';

@ObjectType()
export class PostDTO {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  @IsUUID()
  userId?: string;

  @Field(() => UserDTO)
  user: UserDTO
}
