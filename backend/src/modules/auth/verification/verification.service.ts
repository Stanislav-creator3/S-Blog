import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { TokenType, User } from 'prisma/generated';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { getSessionMetadata } from 'src/shared/utils/session-metadata.util';
import { saveSession } from 'src/shared/utils/session.util';
import { VerifyDto } from './dto/verify.dto';
import { generateToken } from 'src/shared/utils/generate-token.util';

@Injectable()
export class VerificationService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async verify(req: Request, verifyDto: VerifyDto, userAgent: string) {
    const { token } = verifyDto;

    const existingToken = await this.prismaService.token.findUnique({
      where: {
        token,
        type: TokenType.EMAIL_VERIFY,
      },
    });

    if (!existingToken) {
      throw new NotFoundException('Токен не найден');
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date();

    if (hasExpired) {
      throw new NotFoundException('Токен устарел');
    }

    const user = await this.prismaService.user.update({
      where: {
        id: existingToken.userId,
      },
      data: {
        isEmailVerified: true,
      },
    });

    await this.prismaService.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.EMAIL_VERIFY,
      },
    });

    const metadata = getSessionMetadata(req, userAgent);

    return saveSession(req, user, metadata);
  }

  public async sendVerificationToken(user: User) {
    const verificationToken = await generateToken(
      this.prismaService,
      user,
      TokenType.EMAIL_VERIFY,
      true,
    );

    // await this.mailService.sendVerificationToken(
    //     user.email,
    //     verificationToken.token
    // )

    return true;
  }
}
