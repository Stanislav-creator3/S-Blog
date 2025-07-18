import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'prisma/generated';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { findLikesAndBookMarks } from 'src/shared/utils/findLikesAndBookMarks';
import { Request } from 'express';

@Injectable()
export class LikeService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async likePost(user: User, postId: string) {
    const existingLike = await this.prismaService.like.findFirst({
      where: {
        userId: user.id,
        postId,
      },
    });

    if (existingLike) {
      throw new BadRequestException('Вы уже поставили лайк этому посту');
    }

    await this.prismaService.like.create({
      data: { userId: user.id, postId },
    });

    return true;
  }

  public async unLikePost(user: User, postId: string) {
    const existingLike = await this.prismaService.like.findFirst({
      where: {
        userId: user.id,
        postId,
      },
    });

    if (!existingLike) {
      throw new BadRequestException('Лайк не существует');
    }

    await this.prismaService.like.deleteMany({
      where: { userId: user.id, postId },
    });

    return true;
  }

  async findLikesPosts(user: User, req: Request) {
    const take = Number(req.query.take);
    const cursorQuery = (req.query.cursor as string) ?? undefined;
    const skip = cursorQuery ? 1 : 0;
    const cursor = cursorQuery ? { id: cursorQuery } : undefined;

    const posts = await this.prismaService.like.findMany({
      take: take ?? 5,
      skip: skip,
      cursor: cursor,
      where: {
        userId: user.id,
      },
      include: {
        post: {
          include: {
            user: {
              include: {
                _count: {
                  select: {
                    followers: true,
                  },
                },
              },
            },
            likes: true,
            bookMarks: true,
            comments: true,
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const post = posts.map((post) => post.post);

    const nextId = posts.length < take ? undefined : posts[take - 1].id;

    return {
      posts: findLikesAndBookMarks(post, user.id),
      nextId,
    };
  }
}
