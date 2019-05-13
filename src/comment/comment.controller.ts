import {
  Controller,
  Param,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';
import { CommentDTO } from './comment.dto';

@Controller('api/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('idea/:id')
  showCommentsByIdea(@Param('id') id: string, @Query('page') page: number) {
    return this.commentService.showByIdea(id, page);
  }
  @Get('user/:id')
  showCommentsByUser(@Param('id') user: string, @Query('page') page: number) {
    return this.commentService.showByUser(user, page);
  }

  @Post('idea/:id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createCommment(
    @Param('id') idea: string,
    @User('id') user: string,
    @Body('') data: CommentDTO,
  ) {
    return this.commentService.create(idea, user, data);
  }

  @Get(':id')
  showComment(@Param('id') id: string) {
    return this.commentService.show(id);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyComment(@Param('id') id: string, @User('id') user: string) {
    return this.commentService.destroy(id, user);
  }
}
