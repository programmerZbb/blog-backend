import { Injectable, Inject } from '@nestjs/common';

import { ArticleRepository } from '../../db/repositories/article/article.repository';

@Injectable()
export class ArticleService {
  @Inject(ArticleRepository)
  private articleRepository: ArticleRepository;

  public getArticleList(page: number, pageSize: number) {
    return this.articleRepository.find(page, pageSize);
  }

  public getArticleDetail(id: number) {
    return this.articleRepository.findOne({
      id,
    });
  }
}
