import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from 'prisma/generated';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { UserAgent } from 'src/shared/decorators/user-agent.decorator';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangeInfoDto } from './dto/changeInfoDto';
import { ChangeEmailDto } from './dto/changeEmail.dto';
import { SocialLinkDto, SocialLinkOrderDto } from './dto/socialLinkDto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Authorization()
  @Get()
  async me(@Authorized('id') id: string) {
    return await this.accountService.me(id);
  }

  @Post('create')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request,
    @UserAgent() userAgent: string,
  ) {
    return await this.accountService.create(createUserDto, req, userAgent);
  }

  @Authorization()
  @UseInterceptors(FileInterceptor('file'))
  @Post('change-avatar')
  async changeAvatar(@Authorized() user: User, @UploadedFile() file) {
    return this.accountService.changeAvatar(user, file);
  }

  @Authorization()
  @Delete('remove-avatar')
  async removeAvatar(@Authorized() user: User) {
    return this.accountService.removeAvatar(user);
  }

  @Authorization()
  @Post('change-password')
  async changePassword(
    @Authorized() user: User,
    @Body() passwordDto: ChangePasswordDto,
  ) {
    return this.accountService.changePassword(user, passwordDto);
  }

  @Authorization()
  @Post('change-info')
  async changeUserInfo(
    @Authorized() user: User,
    @Body() changeInfo: ChangeInfoDto,
  ) {
    return this.accountService.changeUserInfo(user, changeInfo);
  }

  @Authorization()
  @Post('change-email')
  async changeEmail(
    @Authorized() user: User,
    @Body() emailDto: ChangeEmailDto,
  ) {
    return this.accountService.changeEmail(user, emailDto);
  }

  @Authorization()
  @Get('social-links')
  async findSocialLinks(@Authorized() user: User) {
    return this.accountService.findSocialLinks(user);
  }

  @Authorization()
  @Post('create-social-link')
  async createSocialLink(
    @Authorized() user: User,
    @Body() socialLink: SocialLinkDto,
  ) {
    return this.accountService.createSocialLink(user, socialLink);
  }

  @Authorization()
  @Post('update-social-link')
  async updateSocialLink(
    @Authorized() user: User,
    @Body() socialLink: SocialLinkDto,
    @Body('id') id: string,
  ) {
    return this.accountService.updateSocialLink(user, socialLink, id);
  }

  @Authorization()
  @Post('delete-social-link')
  async removeSocialLink(
    @Authorized() user: User,
    @Body() body: { id: string },
  ) {
    return this.accountService.removeSocialLink(user, body);
  }

  @Authorization()
  @Post('reorder-social-link')
  async reorderSocialLink(
    @Authorized() user: User,
    @Body() list: SocialLinkOrderDto[],
  ) {
    return this.accountService.reorderSocialLink(user, list);
  }
}
