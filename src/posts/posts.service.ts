import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UserEntity } from '../users/entities/user.entity';
import { PostEntity } from './entities/post.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity) private postsRepository: Repository<PostEntity>,
    private readonly userService: UsersService
  ) { }

  async create(createPostInput: CreatePostInput): Promise<PostEntity> {
    // await this.userService.findOne(createPostInput.user_id);
    await this.checkUserCanSetPost(createPostInput.userId)
    return await this.postsRepository.save(createPostInput);
  }

  async findAll(): Promise<PostEntity[]> {
    // return await this.postsRepository.find({ relations: ['user'] });
    return await this.postsRepository.createQueryBuilder()
      .innerJoinAndSelect('PostEntity.user', 'user', 'user.deleted_at is null')
      .getMany();
  }

  async findOne(id: string): Promise<PostEntity> {
    // return await this.postsRepository.findOneOrFail(id, { relations: ['user'] });

    return await this.postsRepository.createQueryBuilder()
      .innerJoinAndSelect('PostEntity.user', 'user', 'user.deleted_at is null')
      .where({ id })
      .getOneOrFail();
  }

  async update(id: string, updatePostInput: UpdatePostInput): Promise<PostEntity> {
    return this.postsRepository.save(updatePostInput);
  }

  async remove(id: string): Promise<PostEntity> {
    const post = await this.postsRepository.findOneOrFail(id);
    await this.postsRepository.softDelete(id);

    return post;
  }

  async findByUser(user: UserEntity): Promise<PostEntity[]> {
    return await this.postsRepository.createQueryBuilder()
      .select(['PostEntity.id', 'Post.title'])
      .innerJoinAndSelect('Post.user', 'user', 'user.deleted_at is null')
      .where({ userId: user.id })
      .orderBy('Post.id', 'DESC')
      .getMany();
  }

  private async checkUserCanSetPost(userId: string): Promise<void> {
    const exists = await this.userService.userExists('id', userId)
    if (!exists) throw new BadRequestException('User không tồn tại để set cho bài viết')
  }
}
