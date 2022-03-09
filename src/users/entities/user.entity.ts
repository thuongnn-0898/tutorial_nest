import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../posts/entities/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field(type => Int, { nullable: true })
  age?: number;

  @ManyToOne(() => Post, post => post.user)
  @Field(type => [Post])
  posts: Post[];
}
