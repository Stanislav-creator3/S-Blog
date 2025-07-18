import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'prisma/generated';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Injectable()
export class CommentsService {
  public constructor(private readonly prismaService: PrismaService) {}

  async createComment(user: User, createCommentDto: CreateCommentDto) {
    const { content, postId } = createCommentDto;

    if (!user) {
      throw new ForbiddenException('Необходима авторизация');
    }

    await this.prismaService.comment.create({
      data: {
        content: content,
        userId: user.id,
        postId: postId,
      },
    });

    return true;
  }

  async deleteComment(user: User, id: string) {
    const comment = await this.prismaService.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }

    if (comment.userId !== user.id) {
      throw new ForbiddenException(
        'Вы не авторизованы для удаления этого комментария',
      );
    }

    await this.prismaService.comment.delete({ where: { id } });

    return true;
  }

  async updateComment(
    user: User,
    updateCommentDto: UpdateCommentDto,
    id: string,
  ) {
    const { content } = updateCommentDto;
    const comment = await this.prismaService.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }
    if (comment.userId !== user.id) {
      throw new ForbiddenException(
        'Вы не авторизованы для удаления этого комментария',
      );
    }

    await this.prismaService.comment.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });

    return true;
  }
}
