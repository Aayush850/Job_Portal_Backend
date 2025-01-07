import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { JobType } from './job-type-enum';
import { Status } from './job-status-enum';

export class CreateJobDto {
  @IsInt()
  userId: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  location: string;

  @IsEnum(JobType)
  employment_type: JobType;

  @IsNumber()
  salary_range: number;

  @IsDate()
  @Type(() => Date)
  application_deadline: Date;

  @IsEnum(Status)
  status: Status;
}
