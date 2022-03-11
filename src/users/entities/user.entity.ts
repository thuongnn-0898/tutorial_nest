import { Exclude, Expose } from 'class-transformer';
import { Post } from 'src/posts/entities/post.entity';
import { 
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn 
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(() => Post, post => post.user)
  posts?: Post[];

  @Expose()
  get full_name(): string
  {
    return `${this.first_name} ${this.last_name}`;
  }
}
