import { Module, UploadedFile } from '@nestjs/common';

import { ArticleRepository } from '../../db/repositories/article/article.repository';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [ArticleRepository, UploadService],
})
export class UploadModule {}
