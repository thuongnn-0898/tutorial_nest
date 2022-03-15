import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { PostsService } from '../posts/posts.service';
import { UsersResolver } from './users.resolver';
import { UserEntity } from './entities/user.entity';
import { PostEntity } from '../posts/entities/post.entity';
import { UserSubscriber } from './entities/user.subcriber';
import { PubSubModule } from '../pubSub.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PostEntity]),
    PubSubModule
  ],
  providers: [
    UsersResolver,
    UsersService,
    PostsService,
    UserSubscriber,
  ],
})
export class UsersModule { }
