import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { findLikesAndBookMarks } from 'src/shared/utils/findLikesAndBookMarks';
import json from 'src/shared/utils/json';

@Injectable()
export class UsersService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async getPopularUsers() {
    const users = await this.prismaService.$queryRaw`
    select
      c.*,
      count(e."followerId")
    from "User" c
    left join "Follow" e
      on c.id = e."followerId"
    group by c.id, e."followerId"
    having count(e."followerId") > 3
    ORDER BY random()
    LIMIT 3
    `;

    return json(users);
  }

  public async getByUserNameUser(req: Request, username: string) {
    const userId = req.session.userId;

    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
      include: {
        posts: {
          include: {
            likes: true,
            bookMarks: true,
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
        },
        socialLinks: true,
        followings: true,
        followers: true,
        _count: {
          select: {
            posts: true,
            comments: true,
            followers: true,
            followings: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (userId) {
      return {
        ...user,
        posts: findLikesAndBookMarks(user.posts, userId),
      };
    }

    return user;
  }
}
