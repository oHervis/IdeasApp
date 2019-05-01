import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { IdeaDTO } from './idea.dto';
import { IdeaService } from './idea.service';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';

@Controller('api/ideas')
export class IdeaController {
  private logger = new Logger('IdeaController');

  constructor(private ideaService: IdeaService) {}

  private logData(options: any) {
    options.user && this.logger.log('USER' + JSON.stringify(options.user));
    options.data && this.logger.log('DATA' + JSON.stringify(options.data));
    options.idea && this.logger.log('IDEA' + JSON.stringify(options.IDEA));
  }

  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createIdea(@User('id') user, @Body() data: IdeaDTO) {
    this.logData({ user, data });
    return this.ideaService.create(user, data);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateIdea(
    @Param('id') id: string,
    @User('id') user: string,
    @Body() data: Partial<IdeaDTO>,
  ) {
    this.logData({ id, data, user });
    return this.ideaService.update(id, user, data);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyIdea(@Param('id') id: string, @User('id') user: string) {
    this.logData({ id, user });
    return this.ideaService.destroy(id, user);
  }

  @Post(':id/bookmark')
  @UseGuards(new AuthGuard())
  bookmarkIdeia(@Param('id') id: string, @User('id') user: string) {
    this.logData({ id, user });
    return this.ideaService.bookmark(id, user);
  }

  @Delete(':id/bookmark')
  @UseGuards(new AuthGuard())
  unBookmarkIdeia(@Param('id') id: string, @User('id') user: string) {
    this.logData({ id, user });
    return this.ideaService.unbookmark(id, user);
  }

  @Post(':id/upvote')
  @UseGuards(new AuthGuard())
  upvoteIdeia(@Param('id') id: string, @User('id') user: string) {
    this.logData({ id, user });
    return this.ideaService.upvote(id, user);
  }

  @Post(':id/downvote')
  @UseGuards(new AuthGuard())
  downvoteIdeia(@Param('id') id: string, @User('id') user: string) {
    this.logData({ id, user });
    return this.ideaService.downvote(id, user);
  }
}
