import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PostsService } from 'src/posts/posts.service';
import { Post } from 'src/posts/entities/post.entity';
import { UserSubscriber } from './entities/user.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  providers: [UsersResolver, UsersService, PostsService, UserSubscriber]
})
export class UsersModule {}
