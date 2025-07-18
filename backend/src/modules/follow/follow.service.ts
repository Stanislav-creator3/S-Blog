import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'prisma/generated';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { findLikesAndBookMarks } from 'src/shared/utils/findLikesAndBookMarks';
import { Request } from 'express';

@Injectable()
export class FollowService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findMyFollowers(user: User) {
    const followers = await this.prismaService.follow.findMany({
      where: {
        followerId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        following: true,
      },
    });

    return followers;
  }

  public async findMyFollowings(user: User) {
    const followings = await this.prismaService.follow.findMany({
      where: {
        followingId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            avatar: true,
            bio: true,
            displayName: true,
            _count: {
              select: {
                followers: true,
              },
            },
          },
        },
      },
    });

    return followings;
  }

  public async findMyPostsSubscriptions(user: User, req: Request) {
    const take = Number(req.query.take);
    const cursorQuery = (req.query.cursor as string) ?? undefined;
    const skip = cursorQuery ? 1 : 0;
    const cursor = cursorQuery ? { id: cursorQuery } : undefined;

    const followings = await this.prismaService.follow.findMany({
      where: {
        followingId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        followerId: true,
      },
    });

    const ids = followings.map((item) => item.followerId);

    const posts = await this.prismaService.post.findMany({
      where: {
        userId: { in: ids },
      },
      take: take ?? 5,
      skip: skip,
      cursor: cursor,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        likes: true,
        bookMarks: true,
        user: {
          include: {
            _count: {
              select: {
                followers: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        comments: true,
      },
    });

    const nextId = posts.length < take ? undefined : posts[take - 1].id;

    return {
      posts: findLikesAndBookMarks(posts, user.id),
      nextId,
    };
  }

  public async follow(user: User, followId: string) {
    const userFollow = await this.prismaService.user.findUnique({
      where: {
        id: followId,
      },
    });

    if (!userFollow) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (userFollow.id === user.id) {
      throw new ConflictException('Нельзя подписываться на самого себя');
    }

    const existingFollow = await this.prismaService.follow.findFirst({
      where: {
        followerId: followId,
        followingId: user.id,
      },
    });

    if (existingFollow) {
      throw new ConflictException('Вы уже подписаны на этот канал');
    }

    const follow = await this.prismaService.follow.create({
      data: {
        followerId: followId,
        followingId: user.id,
      },
      include: {
        follower: true,
        following: true,
      },
    });

    return true;
  }

  public async unFollow(user: User, followId: string) {
    const userFollow = await this.prismaService.user.findUnique({
      where: {
        id: followId,
      },
    });

    if (!userFollow) {
      throw new NotFoundException('Канал не найден');
    }

    if (userFollow.id === user.id) {
      throw new ConflictException('Нельзя подписываться на самого себя');
    }

    const existingFollow = await this.prismaService.follow.findFirst({
      where: {
        followerId: followId,
        followingId: user.id,
      },
    });

    if (!existingFollow) {
      throw new ConflictException('Вы не подписаны на этот канал');
    }

    await this.prismaService.follow.delete({
      where: {
        id: existingFollow.id,
        followerId: followId,
        followingId: user.id,
      },
    });

    return true;
  }
}
