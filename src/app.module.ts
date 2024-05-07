import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// 配置
import { ConfigModule } from './modules/config/config.module';
// 上传服务
import { UploadModule } from './modules/upload/upload.module';
// 文章列表
import { ArticleModule } from './modules/article/article.module';
// mysql & redis
import { DbModule } from './modules/db/db.module';
// 鉴权
import { OauthModule } from './modules/oauth/oauth.module';
// guard
import { JwtGuard } from './guard/jwt/jwt.guard';

@Module({
  imports: [ConfigModule, DbModule, UploadModule, ArticleModule, OauthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
