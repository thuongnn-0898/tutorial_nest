import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/posts/entities/post.entity';
import { Connection, Repository } from 'typeorm';
import { CreateUserMultiPostsInput } from './dto/create-user-multi-posts.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    private connection: Connection
  ) { }

  async findAll(): Promise<UserEntity[]> {
    // query builder
    return await this.usersRepository.createQueryBuilder('users')
      // .select(['User.*'])
      .leftJoinAndSelect('users.posts', 'posts')
      .orderBy('created_at', 'DESC')
      .getMany();
    // return this.usersRepository.find({
    //   relations: ['posts'],
    //   order: { id: 'DESC' }
    // });
  }

  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    return this.usersRepository.save(createUserInput);
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.createQueryBuilder('users')
      .leftJoinAndSelect('users.posts', 'posts')
      .where({ id })
      .getOneOrFail();

    return user;
    // if (user) {
    //   return user
    // }

    // throw new NotFoundException('No record found');

    // return this.usersRepository.findOneOrFail(id, {
    //   relations: ['posts'],
    // });
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<UserEntity> {
    return await this.usersRepository.save(updateUserInput);
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneOrFail(id);

    await this.usersRepository.softDelete(id);

    return user;
  }

  async createUserMultiPost(data: CreateUserMultiPostsInput): Promise<UserEntity> {
    return this.connection.transaction(async manager => {
      const user = await manager.save(UserEntity, data);
      const posts = data.posts.map(post => {
        return { ...post, user }
      })
      await manager.save(PostEntity, posts)

      return user;
    })
  }

  async userExists(fieldName: string, value: string): Promise<boolean> {
    const result = await this.connection.query(`SELECT EXISTS(SELECT 1 FROM users where ${fieldName} = '${value}')`);

    return result[0].exists;
  }
}
