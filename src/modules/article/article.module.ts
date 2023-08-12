import { Module } from '@nestjs/common';

import { ArticleRepository } from '../../db/repositories/article/article.repository';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  providers: [ArticleRepository, ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
