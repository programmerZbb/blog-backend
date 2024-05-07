import { Module } from '@nestjs/common';

import { ArticleRepository } from '../../db/repositories/article/article.repository';
import { ManageController } from './manage.controller';
import { ManageService } from './manage.service';

@Module({
  providers: [ManageService, ArticleRepository],
  controllers: [ManageController],
})
export class ManageModule {}
