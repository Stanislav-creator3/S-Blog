import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from 'prisma/generated';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { CreateCommentDto } from './dto/createComment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @Authorization()
  createComment(
    @Authorized() user: User,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.createComment(user, createCommentDto);
  }

  @Delete(':id')
  @Authorization()
  deleteComment(@Authorized() user: User, @Param('id') id: string) {
    return this.commentsService.deleteComment(user, id);
  }

  @Patch(':id')
  @Authorization()
  updateComment(
    @Param('id') id: string,
    @Authorized() user: User,
    @Body() updateComment: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(user, updateComment, id);
  }
}
