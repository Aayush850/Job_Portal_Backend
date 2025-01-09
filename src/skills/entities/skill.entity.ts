import { JobSkill } from 'src/job-skill/entities/job-skill.entity';
import { UserSkill } from 'src/user-skill/entities/user-skill.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  skill_name: string;

  @OneToMany(() => UserSkill, (user_skill) => user_skill.skill)
  user_skill: UserSkill;

  @OneToMany(() => JobSkill, (job_skill) => job_skill.skill_id)
  job_skill: JobSkill;
}
