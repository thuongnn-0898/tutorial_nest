import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { UserDTO } from 'src/users/dto/user.dto';
import { User } from '../../users/entities/user.entity';

@InputType()
export class CreatePostInput {
  @Field(type => String)
  @MaxLength(255)
  title: string;

  @Field(type => String)
  @IsNotEmpty()
  @IsUUID()
  // validate exists in DB
  userId: string;
}
