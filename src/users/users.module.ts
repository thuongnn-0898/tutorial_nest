import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { PostsService } from 'src/posts/posts.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { UserSubscriber } from './entities/user.subcriber';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  providers: [UsersResolver, UsersService, PostsService, UserSubscriber]
})
export class UsersModule { }
