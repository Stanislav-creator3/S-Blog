import { UpdatePostDto } from './dto/updatePost.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'prisma/generated';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';
import { Request } from 'express';
import { findLikesAndBookMarks } from 'src/shared/utils/findLikesAndBookMarks';

@Injectable()
export class PostService {
  public constructor(private readonly prismaService: PrismaService) {}

  async findAll(req: Request) {
    const userId = req.session.userId;
    const take = Number(req.query.take) ?? 5;
    const cursorQuery = (req.query.cursor as string) ?? undefined;
    const skip = cursorQuery ? 1 : 0;
    const cursor = cursorQuery ? { id: cursorQuery } : undefined;

    const data = await this.prismaService.post.findMany({
      skip: skip,
      take: take ?? 5,
      cursor: cursor,
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

    const nextId = data.length < take ? undefined : data[take - 1].id;

    if (userId) {
      return {
        posts: findLikesAndBookMarks(data, userId),
        nextId,
      };
    }

    return { posts: data, nextId };
  }

  async findPostPopular(req: Request) {
    const userId = req.session.userId;
    const take = Number(req.query.take) ?? 5;
    const cursorQuery = (req.query.cursor as string) ?? undefined;
    const skip = cursorQuery ? 1 : 0;
    const cursor = cursorQuery ? { id: cursorQuery } : undefined;

    const posts = await this.prismaService.post.findMany({
      skip: skip,
      take: take,
      cursor: cursor,
      where: {
        likes: {
          some: {},
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
        likes: {
          _count: 'desc',
        },
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

  async findById(req: Request, id: string) {
    const userId = req.session.userId;
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
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
        comments: {
          include: {
            user: {
              select: {
                displayName: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        likes: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    const bookMark = await this.prismaService.bookMark.findFirst({
      where: {
        userId,
        postId: id,
      },
    });

    const bookMarkedByUser = bookMark ? true : false;

    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    const itemCount = await this.prismaService.post.count({
      where: {
        user: {
          id: post.userId,
        },
      },
    });

    const skip = Math.max(0, Math.floor(Math.random() * itemCount) - 2);

    const morePostsUser = await this.prismaService.post.findMany({
      where: {
        id: {
          not: id,
        },
        user: {
          id: post.userId,
        },
      },
      take: 2,
      skip: skip,
    });

    if (userId) {
      return {
        ...post,
        likedByUser: post.likes.some((like) => like.userId === userId),
        bookMarkedByUser,
        morePostsUser,
      };
    }

    return { ...post, morePostsUser };
  }

  public async findByIdPostsUser(req: Request, id: string) {
    const userId = req.session.userId;
    const take = Number(req.query.take) ?? 5;
    const cursorQuery = (req.query.cursor as string) ?? undefined;
    const skip = cursorQuery ? 1 : 0;
    const cursor = cursorQuery ? { id: cursorQuery } : undefined;

    const posts = await this.prismaService.post.findMany({
      where: {
        userId: id,
      },
      take: take,
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
        comments: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    const nextId = posts.length < take ? undefined : posts[take - 1].id;

    if (userId) {
      return { posts: findLikesAndBookMarks(posts, userId), nextId };
    }

    return { posts, nextId };
  }

  async createPost(user: User, createPostDto: CreatePostDto) {
    const { title, content, imageUrl, tags } = createPostDto;

    const post = await this.prismaService.post.create({
      data: {
        title,
        content,
        imageUrl,
        tags,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return post;
  }

  async searchPosts(query: string, req: Request) {
    const userId = req.session.userId;

    const take = Number(req.query.take) ?? 5;
    const cursorQuery = (req.query.cursor as string) ?? undefined;
    const skip = cursorQuery ? 1 : 0;
    const cursor = cursorQuery ? { id: cursorQuery } : undefined;

    const posts = await this.prismaService.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
        ],
      },
      take: take,
      skip: skip,
      cursor: cursor,
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
      return { posts: findLikesAndBookMarks(posts, userId), nextId };
    }

    return {
      posts: posts,
      nextId,
    };
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    const { title, content, imageUrl, tags } = updatePostDto;

    const post = await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        imageUrl,
        tags,
      },
    });

    return post;
  }

  async deletePost(user: User, id: string) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    if (user.id !== post.userId) {
      throw new ForbiddenException('Нельзя удалять чужие посты');
    }

    await this.prismaService.post.delete({
      where: {
        id,
      },
    });

    return true;
  }

  async discussionPosts() {
    const lastWeekStart = new Date();
    lastWeekStart.setDate(lastWeekStart.getDate() - 60);
    const posts = await this.prismaService.post.findMany({
      where: {
        createdAt: {
          gte: lastWeekStart,
        },
      },
      include: {
        user: {
          select: {
            displayName: true,
            avatar: true,
            id: true,
            _count: {
              select: {
                followers: true,
              },
            },
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return posts
      .filter((post) => post._count.comments >= 3)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }
}

// const posts = await this.prismaService.$queryRaw`
// select
//   post.*,
//   post.id as "postId",
//   u.display_name,
//   u.id,
//   u.avatar,
//   -- count(DISTINCT comment.id) as "commentCount",
//   count(follow."followerId") as "followerCount"
// from "Post" as post
// left join "Comment" as comment
//   on post.id = comment."postId"
// left join "User" u
//   on post."userId" = u.id
// left join "Follow" as follow
//   on u.id = follow."followerId"
// where
// post."createdAt" > NOW() - interval '7 day' or post."createdAt" < NOW()
// group by u.id, follow."followerId", post.id
// having count(comment."postId") > 3
// ORDER BY random()
// LIMIT 3;
// `;
