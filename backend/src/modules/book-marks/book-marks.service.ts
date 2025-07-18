import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'prisma/generated';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { findLikesAndBookMarks } from 'src/shared/utils/findLikesAndBookMarks';
import { Request } from 'express';

@Injectable()
export class BookMarksService {
  public constructor(private readonly prismaService: PrismaService) {}

  async findMyBookMarks(user: User, req: Request) {
    const take = Number(req.query.take);
    const cursorQuery = (req.query.cursor as string) ?? undefined;
    const skip = cursorQuery ? 1 : 0;
    const cursor = cursorQuery ? { id: cursorQuery } : undefined;

    const data = await this.prismaService.bookMark.findMany({
      where: {
        userId: user.id,
      },
      skip: skip,
      take: take ?? 5,
      cursor: cursor,
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

    const nextId = data.length < take ? undefined : data[take - 1].id;

    const post = data.map((post) => post.post);

    const posts = findLikesAndBookMarks(post, user.id);

    return {
      posts,
      nextId,
    };
  }

  async addBookMark(user: User, postId: string) {
    const existingLike = await this.prismaService.bookMark.findFirst({
      where: {
        userId: user.id,
        postId,
      },
    });

    if (existingLike) {
      throw new BadRequestException('Вы уже добавили в закладки этот пост');
    }

    await this.prismaService.bookMark.create({
      data: { userId: user.id, postId },
    });

    return true;
  }

  async removeBookMark(user: User, postId: string) {
    const existingBookMark = await this.prismaService.bookMark.findFirst({
      where: {
        userId: user.id,
        postId,
      },
    });

    if (!existingBookMark) {
      throw new BadRequestException('Закладка не существует');
    }

    await this.prismaService.bookMark.deleteMany({
      where: { userId: user.id, postId },
    });

    return true;
  }
}
