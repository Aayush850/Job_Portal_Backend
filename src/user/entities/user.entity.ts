import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { userRole } from '../dto/user-role-enum';
import { Job } from 'src/jobs/entities/job.entity';
import { Application } from 'src/applications/entities/application.entity';
import { Resume } from 'src/resumes/entities/resume.entity';
import { UserSkill } from 'src/user-skill/entities/user-skill.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @Column({
    type: 'enum',
    enum: userRole,
  })
  role: userRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Job, (job) => job.user)
  jobs: Job[];

  @OneToMany(() => Application, (application) => application.user)
  application: Application;

  @OneToOne(() => Resume, (resume) => resume.user)
  resume: Resume;

  @OneToMany(() => UserSkill, (user_skill) => user_skill.user_id)
  user_skill: UserSkill;
}
