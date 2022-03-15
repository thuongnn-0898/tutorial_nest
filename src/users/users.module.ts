import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { PostsService } from 'src/posts/posts.service';
import { UsersResolver } from './users.resolver';
import { UserEntity } from './entities/user.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UserSubscriber } from './entities/user.subcriber';
import { PubSubModule } from 'src/pubSub.module';

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
