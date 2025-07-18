import { Controller, Get, Param, Req } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Request } from 'express';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get('/popular')
  getPopularTags() {
    return this.tagsService.getPopularTags();
  }

  @Get('/:name')
  getPostsByTag(@Param('name') name: string, @Req() req: Request) {
    return this.tagsService.getPostsByTag(name, req);
  }
}
