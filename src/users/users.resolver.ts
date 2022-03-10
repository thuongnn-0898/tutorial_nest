import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDTO } from './dto/user.dto';
import { plainToClass } from 'class-transformer';

@Resolver(() => UserDTO)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserDTO)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [UserDTO], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserDTO, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserDTO)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const user = this.usersService.update(updateUserInput.id, updateUserInput);

    return plainToClass(UserDTO, user);
  }

  @Mutation(() => UserDTO)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    const user = this.usersService.remove(id);

    return plainToClass(UserDTO, user);
  }
}
