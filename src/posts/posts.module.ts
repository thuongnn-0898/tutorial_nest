import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PostEntity } from './entities/post.entity';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
  providers: [PostsResolver, PostsService, UsersService],
})
export class PostsModule { }
