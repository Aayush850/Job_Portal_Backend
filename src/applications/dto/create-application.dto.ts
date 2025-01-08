import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { ApplicationStatus } from './application-status-enum';

export class CreateApplicationDto {
  @IsInt()
  jobId: number;

  @IsInt()
  userId: number;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;
}
