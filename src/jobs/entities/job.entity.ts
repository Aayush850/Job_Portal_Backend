import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { JobType } from '../dto/job-type-enum';
import { Status } from '../dto/job-status-enum';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column({ type: 'enum', enum: JobType })
  employment_type: JobType;

  @Column()
  salary_range: number;

  @CreateDateColumn()
  posted_date: Date;

  @Column()
  application_deadline: Date;

  @Column({ type: 'enum', enum: Status })
  status: Status;
}
