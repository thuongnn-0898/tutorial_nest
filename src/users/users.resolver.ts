import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { plainToClass } from 'class-transformer';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDTO } from './dto/user.dto';
import { CreateUserMultiPostsInput } from './dto/create-user-multi-posts.input';

@Resolver(() => UserDTO)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Mutation(() => UserDTO)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<UserEntity> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [UserDTO], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserDTO, { name: 'user' })
  findOne(@Args('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserDTO)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const user = this.usersService.update(updateUserInput.id, updateUserInput);

    return plainToClass(UserDTO, user);
  }

  @Mutation(() => UserDTO)
  removeUser(@Args('id', ParseUUIDPipe) id: string) {
    const user = this.usersService.remove(id);

    return plainToClass(UserDTO, user);
  }

  @Mutation(() => UserDTO)
  createUserAndPost(
    @Args('data') data: CreateUserMultiPostsInput,
  ) {
    const user = this.usersService.createUserMultiPost(data);

    return plainToClass(UserDTO, user);
  }

  // @ResolveField('posts',() => [PostDTO])
  // async posts(@Parent() user: User) {
  //   return this.postService.findByUser(user)
  // }
}
