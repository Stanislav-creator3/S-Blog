import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { IS_DEV_ENV } from '../shared/utils/is-dev.util';
import { AccountModule } from 'src/modules/auth/account/account.module';
import { PrismaModule } from './prisma/prisma.module';
import { SessionModule } from 'src/modules/auth/session/session.module';
import { VerificationModule } from 'src/modules/auth/verification/verification.module';
import { PostModule } from 'src/modules/posts/post.module';
import { StorageModule } from 'src/modules/libs/storage/storage.module';
import { UsersModule } from 'src/modules/users/users.module';
import { FollowModule } from 'src/modules/follow/follow.module';
import { CommentsModule } from 'src/modules/comments/comments.module';
import { LikeModule } from 'src/modules/like/like.module';
import { TagsModule } from 'src/modules/tags/tags.module';
import { BookMarksModule } from 'src/modules/book-marks/book-marks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    RedisModule,
    AccountModule,
    PrismaModule,
    SessionModule,
    VerificationModule,
    PostModule,
    StorageModule,
    UsersModule,
    FollowModule,
    CommentsModule,
    LikeModule,
    TagsModule,
    BookMarksModule,
  ],
})
export class CoreModule {}
