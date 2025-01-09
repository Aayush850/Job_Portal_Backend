import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file_url: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => User, (user) => user.resume)
  user: User;
}
