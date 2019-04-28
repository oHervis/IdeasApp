import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

import { IdeaEntity } from './idea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDTO } from './idea.dto';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
  ) {}

  async showAll() {
    return await this.ideaRepository.find();
  }

  async create(data: IdeaDTO) {
    const idea = await this.ideaRepository.create(data);
    await this.ideaRepository.save(idea);
    return idea;
  }

  async read(id: string) {
    return await this.getIdeaById(id);
  }

  async update(id: string, data: Partial<IdeaDTO>) {
    let idea = await this.getIdeaById(id);
    await this.ideaRepository.update({ id }, data);
    idea = await this.getIdeaById(id);
    return idea;
  }

  async destroy(id: string) {
    const idea = await this.getIdeaById(id);
    await this.ideaRepository.delete({ id });
    return idea;
  }

  private async getIdeaById(id: string) {
    const idea = await this.ideaRepository.findOne({ where: { id } });
    if (!idea) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return idea;
  }
}
