import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApplicationStatus } from '../dto/application-status-enum';
import { Job } from 'src/jobs/entities/job.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  application_date: Date;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @ManyToOne(() => Job, (job) => job.application)
  job: Job;

  @ManyToOne(() => User, (user) => user.application)
  user: User;
}
