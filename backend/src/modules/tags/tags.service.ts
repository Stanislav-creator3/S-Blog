import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { Request } from 'express';
import { findLikesAndBookMarks } from 'src/shared/utils/findLikesAndBookMarks';

@Injectable()
export class TagsService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async getPopularTags() {
    const tags = await this.prismaService.post
      .findMany({
        select: {
          tags: true,
        },
      })
      .then((tags) => tags.reduce((acc, tag) => acc.concat(tag.tags), []))
      .then((tags) => {
        const count = tags.reduce((acc, tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
          return acc;
        }, {});
        return Object.entries(count)
          .sort(([, a], [, b]) => Number(b) - Number(a))
          .map((tag) => tag[0])
          .slice(0, 5);
      });
    return tags;
  }

  public async getPostsByTag(name: string, req: Request) {
    const userId = req.session.userId;
    const take = Number(req.query.take);
    const cursorQuery = (req.query.cursor as string) ?? undefined;
    const skip = cursorQuery ? 1 : 0;
    const cursor = cursorQuery ? { id: cursorQuery } : undefined;

    const posts = await this.prismaService.post.findMany({
      take: take ?? 5,
      skip: skip,
      cursor: cursor,
      where: {
        tags: {
          has: name,
        },
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
        comments: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const nextId = posts.length < take ? undefined : posts[take - 1].id;

    if (userId) {
      return {
        posts: findLikesAndBookMarks(posts, userId),
        nextId,
      };
    }

    return { posts, nextId };
  }
}
