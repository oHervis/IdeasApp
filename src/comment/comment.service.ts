import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { IdeaEntity } from 'src/idea/idea.entity';
import { CommentDTO } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
  ) {}

  private toResponseObject(comment: CommentEntity) {
    const responseObject: any = comment;
    if (responseObject.author) {
      responseObject.author = responseObject.author.toResponseObject();
    }
    return responseObject;
  }

  async showByIdea(id: string) {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['comments', 'comments.author', 'comments.idea'],
    });
    return idea.comments.map(comment => this.toResponseObject(comment));
  }

  async showByUser(id: string) {
    const comments = await this.commentRepository.findOne({
      where: { author: { id } },
      relations: ['author'],
    });
    return this.toResponseObject(comments);
  }

  async show(id: string) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'idea'],
    });
    return this.toResponseObject(comment);
  }

  async create(id: string, userId: string, data: CommentDTO) {
    const idea = await this.ideaRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const comment = await this.commentRepository.create({
      ...data,
      idea,
      author: user,
    });
    await this.commentRepository.save(comment);
    return this.toResponseObject(comment);
  }
  async destroy(id: string, userId: string) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'idea'],
    });
    if (comment.author.id !== userId) {
      throw new HttpException(
        'You not own this comment',
        HttpStatus.UNAUTHORIZED,
      );
    }
    this.commentRepository.remove(comment);
    return this.toResponseObject(comment);
  }
}
