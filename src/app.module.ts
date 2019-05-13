import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { IdeaModule } from './idea/idea.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LogginInterceptor } from './shared/loggin.interceptor';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./src/user.graphql'],
    }),
    IdeaModule,
    UserModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogginInterceptor,
    },
  ],
})
export class AppModule {}
