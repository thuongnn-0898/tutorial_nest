import { Resolver, Query, Mutation, Args, Int, Subscription, Context } from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { plainToClass } from 'class-transformer';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDTO } from './dto/user.dto';
import { CreateUserMultiPostsInput } from './dto/create-user-multi-posts.input';
import { PostDTO } from '../posts/dto/post.dto';
import { Inject, UseGuards } from '@nestjs/common';
import { PUB_SUB } from '../pubSub.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => UserDTO)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub
  ) { }

  @Mutation(() => UserDTO)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<UserEntity> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [UserDTO], { name: 'users' })
  findAll() {
    const users = this.usersService.findAll();
    return plainToClass(UserDTO, users);
  }

  @Query(() => UserDTO, { name: 'user' })
  findOne(@Args('id', ParseUUIDPipe) id: string) {
    const user = this.usersService.findOne(id);
    return plainToClass(UserDTO, user);
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

  @Subscription(() => PostDTO, {
    name: 'postAdded',
    filter: (payload, variables): boolean => {
      // thoả mản điều kiện thì mới listen được
      return true // payload.postAdded;
    },
    resolve: value => {
      // mutation dât trước khi trả về cho listening
      return {
        ...value.postAdded,
        title: `Title: ${value.postAdded.title}`
      }
    }
  })
  postAdded() {
    // contiue handle ...
    return this.pubSub.asyncIterator('postAdded');
  }

  // @ResolveField('posts',() => [PostDTO])
  // async posts(@Parent() user: User) {
  //   return this.postService.findByUser(user)
  // }
}
