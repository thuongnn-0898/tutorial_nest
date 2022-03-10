import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @OneToMany(() => User, user => user.posts, {
    cascade: true,
  })
  @Field(type => [User])
  user: User
}
