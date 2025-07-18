import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from 'prisma/generated';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Request } from 'express';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/discussion')
  discussionPosts() {
    return this.postService.discussionPosts();
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.postService.findAll(req);
  }

  @Get('/popular')
  findPostPopular(@Req() req: Request) {
    return this.postService.findPostPopular(req);
  }

  @Get(':id')
  findById(@Req() req: Request, @Param('id') id: string) {
    return this.postService.findById(req, id);
  }

  @Get('/users/:id')
  findByIdPostsUser(@Req() req: Request, @Param('id') id: string) {
    return this.postService.findByIdPostsUser(req, id);
  }

  @Get('/search/:query')
  searchPosts(@Param('query') query: string, @Req() req: Request) {
    return this.postService.searchPosts(query, req);
  }

  @Authorization()
  @Post()
  createPost(@Authorized() user: User, @Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(user, createPostDto);
  }

  @Authorization()
  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Authorization()
  @Delete(':id')
  deletePost(@Authorized() user: User, @Param('id') id: string) {
    return this.postService.deletePost(user, id);
  }
}
