import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { Inject, ParseUUIDPipe } from '@nestjs/common';

import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostDTO } from './dto/post.dto';
import { PUB_SUB } from '../pubSub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { UserDTO } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { plainToClass } from 'class-transformer';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from '../users/entities/user.entity';

@Resolver(() => PostDTO)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly userService: UsersService,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
  ) { }

  @Mutation(() => PostDTO)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    const post = await this.postsService.create(createPostInput);
    await this.pubSub.publish('postAdded', { postAdded: post })

    return post;
  }

  @Query(() => [PostDTO], { name: 'posts' })
  findAll() {
    const result = this.postsService.findAll();

    return result;
  }

  @Query(() => PostDTO, { name: 'post' })
  findOne(@Args('id', ParseUUIDPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => PostDTO)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => PostDTO)
  removePost(@Args('id', ParseUUIDPipe) id: string) {
    return this.postsService.remove(id);
  }

  @ResolveField('userByPost', () => UserDTO)
  async userByPost(post: PostEntity): Promise<UserDTO> {
    const user: UserEntity = await this.userService.findOne(post.userId)

    return plainToClass(UserDTO, user);
  }
}
