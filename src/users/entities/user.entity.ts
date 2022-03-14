import { Exclude, Expose } from 'class-transformer';
import { PostEntity } from 'src/posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  @Index('users_email_index')
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  age?: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => PostEntity, post => post.user)
  posts?: PostEntity[];

  @Expose()
  get full_name(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}
