import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { JobType } from './dto/job-type-enum';
import { Status } from './dto/job-status-enum';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createJobDto: CreateJobDto) {
    const user = await this.userRepository.findOne({
      where: { id: createJobDto.userId },
    });
    const job = this.jobRepository.create({
      ...createJobDto,
      user,
    });
    return this.jobRepository.save(job);
  }

  async findAll(query: {
    employment_type?: JobType;
    limit: number;
    page: number;
    status?: Status;
  }) {
    const { employment_type, status, limit, page } = query;
    const data = await this.jobRepository.find({
      where: { employment_type, status },
      take: limit,
      skip: (page - 1) * limit,
    });
    const totalCount = await this.jobRepository.count();
    const totalPages = Math.ceil(totalCount / limit);
    return { data, totalPages };
  }

  async findOne(id: number) {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job)
      throw new NotFoundException(`Job with the id ${id} was not found.`);
    return job;
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    await this.findOne(id);
    await this.jobRepository.update(id, updateJobDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.jobRepository.delete(id);
  }
}
