import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { User } from '../users/entities/user.entity';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private readonly userService: UsersService
  ) { }

  async create(createPostInput: CreatePostInput): Promise<Post> {
    await this.userService.findOne(createPostInput.userId);
    this.postsRepository.create(createPostInput);

    return await this.postsRepository.save(createPostInput);
  }

  async findAll(): Promise<Post[]> {
    // return await this.postsRepository.find({ relations: ['user'] });

    return await this.postsRepository.createQueryBuilder()
      .leftJoinAndSelect('Post.user', 'user')
      .getMany();
  }

  async findOne(id: number) {
    // return await this.postsRepository.findOneOrFail(id, { relations: ['user'] });

    return await this.postsRepository.createQueryBuilder()
      .leftJoinAndSelect('Post.user', 'user')
      .where({ id })
      .getOneOrFail();
  }

  async update(id: number, updatePostInput: UpdatePostInput): Promise<Post> {
    await this.userService.findOne(updatePostInput.userId);
    await this.postsRepository.update(id, { ...updatePostInput });

    return await this.postsRepository.findOne(id);
  }

  async remove(id: number): Promise<Post> {
    const post = await this.postsRepository.findOneOrFail(id);

    await this.postsRepository.softDelete(id);

    return post;
  }

  async findByUser(user: User): Promise<Post[]> {
    return await this.postsRepository.createQueryBuilder()
      .select(['Post.id', 'Post.title'])
      .leftJoinAndSelect('Post.user', 'user')
      .where('"userId" = :userId', { userId: user.id })
      .orderBy('Post.id', 'DESC')
      .getMany();
  }
}
