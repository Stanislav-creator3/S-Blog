import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { FollowService } from './follow.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from 'prisma/generated';
import { Request } from 'express';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Authorization()
  @Get('/followers')
  async findMyFollowers(@Authorized() user: User) {
    return this.followService.findMyFollowers(user);
  }

  @Authorization()
  @Get('/followings')
  async findMyFollowings(@Authorized() user: User) {
    return this.followService.findMyFollowings(user);
  }

  @Authorization()
  @Post('/follow')
  async follow(@Authorized() user: User, @Body('followId') followId: string) {
    return this.followService.follow(user, followId);
  }

  @Authorization()
  @Post('/unfollow')
  async unFollow(@Authorized() user: User, @Body('followId') followId: string) {
    return this.followService.unFollow(user, followId);
  }

  @Authorization()
  @Get('/subscriptions')
  async findMyPostsSubscriptions(
    @Authorized() user: User,
    @Req() req: Request,
  ) {
    return this.followService.findMyPostsSubscriptions(user, req);
  }
}
