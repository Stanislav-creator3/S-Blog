import { Controller, Get, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('popular')
  public async getPopularUsers() {
    return await this.usersService.getPopularUsers();
  }

  @Get(':username')
  public async getByIdUser(
    @Req() req: Request,
    @Param('username') username: string,
  ) {
    return await this.usersService.getByUserNameUser(req, username);
  }
}
