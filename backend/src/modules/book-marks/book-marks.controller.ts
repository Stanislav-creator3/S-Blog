import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { BookMarksService } from './book-marks.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from 'prisma/generated';
import { Request } from 'express';

@Controller('bookmarks')
export class BookMarksController {
  constructor(private readonly bookMarksService: BookMarksService) {}

  @Authorization()
  @Get()
  findMyBookMarks(@Authorized() user: User, @Req() req: Request) {
    return this.bookMarksService.findMyBookMarks(user, req);
  }

  @Authorization()
  @Post(':id')
  addBookMark(@Authorized() user: User, @Param('id') postId: string) {
    return this.bookMarksService.addBookMark(user, postId);
  }

  @Authorization()
  @Delete(':id')
  removeBookMark(@Authorized() user: User, @Param('id') postId: string) {
    return this.bookMarksService.removeBookMark(user, postId);
  }
}
