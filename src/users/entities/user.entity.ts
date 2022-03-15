import { Exclude, Expose } from 'class-transformer';
import { PostEntity } from '../../posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  @Index('users_email_index')
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  age?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => PostEntity, post => post.user, { nullable: true })
  posts: PostEntity[];

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
