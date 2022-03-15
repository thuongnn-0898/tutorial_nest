import { UserEntity } from '../../users/entities/user.entity';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, user => user.posts, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
