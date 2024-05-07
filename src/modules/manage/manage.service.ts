import { Injectable, Inject } from '@nestjs/common';

import { ArticleRepository } from '../../db/repositories/article/article.repository';

@Injectable()
export class ManageService {
  @Inject(ArticleRepository)
  private articleRepository: ArticleRepository;

  public delete(id: number) {
    return this.articleRepository.delete(id);
  }
}
