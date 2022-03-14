import { User } from 'src/users/entities/user.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.posts, {
    cascade: true,
  })
  user: User

  @DeleteDateColumn()
  deleted_at: Date;
}
