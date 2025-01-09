import { Skill } from 'src/skills/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserSkill {
  @PrimaryGeneratedColumn()
  user_skill_id: number;

  @Column()
  user_id: number;

  @Column()
  skill_id: number;

  @ManyToOne(() => User, (user) => user.user_skill)
  user: User;

  @ManyToOne(() => Skill, (skill) => skill.user_skill)
  skill: Skill;
}
