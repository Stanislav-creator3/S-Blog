import type { CreateUserDto } from './dto/create-user.dto';
import * as sharp from 'sharp';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { hash, verify } from 'argon2';
import { VerificationService } from '../verification/verification.service';
import { User } from 'prisma/generated';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { ChangeEmailDto } from './dto/changeEmail.dto';
import { getSessionMetadata } from 'src/shared/utils/session-metadata.util';
import { Request } from 'express';
import { saveSession } from 'src/shared/utils/session.util';
import { StorageService } from 'src/modules/libs/storage/storage.service';
import { ChangeInfoDto } from './dto/changeInfoDto';
import { SocialLinkDto, SocialLinkOrderDto } from './dto/socialLinkDto';

@Injectable()
export class AccountService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly verificationService: VerificationService,
    private readonly storageService: StorageService,
  ) {}

  public async me(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        socialLinks: true,
      },
    });

    return user;
  }

  public async create(
    createUserDto: CreateUserDto,
    req: Request,
    userAgent: string,
  ) {
    const { username, email, password } = createUserDto;

    const isUsernameExists = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (isUsernameExists) {
      throw new ConflictException('Это имя пользователя уже занято');
    }

    const isEmailExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExists) {
      throw new ConflictException('Этот email уже занят');
    }

    const user = await this.prismaService.user.create({
      data: {
        username,
        email,
        password: await hash(password),
        displayName: username,
      },
    });

    await this.verificationService.sendVerificationToken(user);

    const metadata = getSessionMetadata(req, userAgent);

    return saveSession(req, user, metadata);
  }

  public async changeAvatar(user: User, file: any) {
    if (user.avatar) {
      await this.storageService.remove(user.avatar);
    }

    const fileName = `/user/${user.username}.webp`;

    if (file.originalname && file.originalname.endsWith('.gif')) {
      const processedBuffer = await sharp(file.buffer, { animated: true })
        .resize(512, 512)
        .webp()
        .toBuffer();

      await this.storageService.upload(processedBuffer, fileName, 'image/webp');
    } else {
      const processedBuffer = await sharp(file.buffer)
        .resize(512, 512)
        .webp()
        .toBuffer();

      await this.storageService.upload(processedBuffer, fileName, 'image/webp');
    }

    const updateUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        avatar: fileName,
      },
    });

    return updateUser;
  }

  public async removeAvatar(user: User) {
    if (!user.avatar) return;

    await this.storageService.remove(user.avatar);

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        avatar: null,
      },
    });

    return true;
  }

  public async changeEmail(user: User, emailDto: ChangeEmailDto) {
    const { email } = emailDto;

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        email,
      },
    });

    return true;
  }

  public async changePassword(user: User, passwordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = passwordDto;

    const isValidPassword = await verify(user.password, oldPassword);

    if (!isValidPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await hash(newPassword),
      },
    });

    return true;
  }

  public async changeUserInfo(user: User, changeInfo: ChangeInfoDto) {
    const { displayName, bio, username } = changeInfo;

    const usernameExists = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (usernameExists && username !== user.username) {
      throw new ConflictException('Это имя пользователя уже занято');
    }

    const updateUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        displayName,
        bio,
        username,
      },
    });

    return updateUser;
  }

  public async findSocialLinks(user: User) {
    const socialLinks = await this.prismaService.socialLink.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        position: 'asc',
      },
    });

    return socialLinks;
  }

  public async createSocialLink(user: User, socialLink: SocialLinkDto) {
    const { title, url } = socialLink;

    const lostSocialLink = await this.prismaService.socialLink.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        position: 'desc',
      },
    });

    const nesPosition = lostSocialLink ? lostSocialLink.position + 1 : 1;

    await this.prismaService.socialLink.create({
      data: {
        title,
        url,
        position: nesPosition,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return true;
  }

  public async updateSocialLink(
    user: User,
    socialLink: SocialLinkDto,
    id: string,
  ) {
    const { title, url } = socialLink;

    const link = await this.prismaService.socialLink.findUnique({
      where: {
        id,
      },
    });

    if (link.userId !== user.id) {
      throw new ForbiddenException('Нельзя редактировать чужие ссылки');
    }

    await this.prismaService.socialLink.update({
      where: {
        id,
      },
      data: {
        title,
        url,
      },
    });

    return true;
  }

  public async reorderSocialLink(user: User, list: SocialLinkOrderDto[]) {
    if (!list.length) {
      return;
    }

    const updatePromises = list.map((socialLink) => {
      return this.prismaService.socialLink.update({
        where: {
          id: socialLink.id,
        },
        data: {
          position: socialLink.position,
        },
      });
    });

    await Promise.all(updatePromises);

    return true;
  }

  async removeSocialLink(user: User, body: { id: string }) {
    const { id } = body;
    const socialLink = await this.prismaService.socialLink.findUnique({
      where: {
        id,
      },
    });

    if (socialLink.userId !== user.id) {
      throw new ForbiddenException('Нельзя удалять чужие ссылки');
    }

    await this.prismaService.socialLink.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
