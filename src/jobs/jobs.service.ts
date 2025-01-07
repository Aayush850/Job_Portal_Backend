import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
  ) {}
  async create(createJobDto: CreateJobDto) {
    const job = this.jobRepository.create(createJobDto);
    return this.jobRepository.save(job);
  }

  findAll() {
    return this.jobRepository.find();
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
