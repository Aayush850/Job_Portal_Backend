import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateResumeDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  resume_file: string;
}
