import { Controller, Get, Inject, Query } from '@nestjs/common';

import { NeedAuth } from '../../guard/jwt/auth.decorator';
import { ArticleService } from './article.service';
import { ArticleListDto, ArticleDetailDto } from './article.dto';

@NeedAuth(false)
@Controller('article')
export class ArticleController {
  @Inject(ArticleService)
  private articleService: ArticleService;

  @Get('articleList')
  public async articleList(@Query() query: ArticleListDto) {
    return this.articleService.getArticleList(query.page, query.pageSize);
  }

  @Get('detail')
  public async getArticleDetail(@Query() query: ArticleDetailDto) {
    return this.articleService.getArticleDetail(query.id);
  }
}
