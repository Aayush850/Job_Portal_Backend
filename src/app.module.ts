import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';
import { ResumesModule } from './resumes/resumes.module';
import { SkillsModule } from './skills/skills.module';
import { UserSkillModule } from './user-skill/user-skill.module';
import { JobSkillModule } from './job-skill/job-skill.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'Aayush',
      password: 'Database!2',
      database: 'job_portal',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    JobsModule,
    ApplicationsModule,
    ResumesModule,
    SkillsModule,
    UserSkillModule,
    JobSkillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
