import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Job } from 'src/jobs/entities/job.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
  ) {}
  async create(createApplicationDto: CreateApplicationDto) {
    const user = await this.userRepository.findOne({
      where: { id: createApplicationDto.userId },
    });
    if (!user)
      throw new NotFoundException(
        `User with the id ${createApplicationDto.userId} was not found`,
      );
    const job = await this.jobRepository.findOne({
      where: { id: createApplicationDto.jobId },
    });
    if (!job)
      throw new NotFoundException(
        `Job with the id ${createApplicationDto.jobId} was not found`,
      );
    const application = this.applicationRepository.create({
      ...createApplicationDto,
      user,
      job,
    });
    return this.applicationRepository.save(application);
  }

  async findAll() {
    return this.applicationRepository.find({
      relations: ['user', 'job'],
    });
  }

  async findOne(id: number) {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: ['user', 'job'],
    });
    if (!application)
      throw new NotFoundException(
        `Application with the id ${id} was not found.`,
      );
    return application;
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto) {
    await this.findOne(id);
    await this.applicationRepository.update(id, updateApplicationDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.applicationRepository.delete(id);
  }
}
