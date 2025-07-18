import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { LikeService } from './like.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from 'prisma/generated';
import { Request } from 'express';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Authorization()
  @Get('/posts')
  findLikesPosts(@Authorized() user: User, @Req() req: Request) {
    return this.likeService.findLikesPosts(user, req);
  }

  @Authorization()
  @Post(':id')
  likePost(@Authorized() user: User, @Param('id') postId: string) {
    return this.likeService.likePost(user, postId);
  }

  @Authorization()
  @Delete(':id')
  unLikePost(@Authorized() user: User, @Param('id') postId: string) {
    return this.likeService.unLikePost(user, postId);
  }
}
