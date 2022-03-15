import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostDTO } from './dto/post.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => PostDTO)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) { }

  @Mutation(() => PostDTO)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
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
}
