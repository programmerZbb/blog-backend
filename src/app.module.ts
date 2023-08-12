import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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

@Module({
  imports: [ConfigModule, DbModule, UploadModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
