import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Article } from '../../entities/article.entity';
import { Create, Update } from './article.vo';

@Injectable()
export class ArticleRepository {
  @InjectRepository(Article)
  private repository: Repository<Article>;

  public async findOne(params: { id?: number; name?: string }) {
    return await this.repository.findOne({
      where: params,
    });
  }

  public async find(page: number, pageSize: number) {
    return await this.repository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  public async create(article: Create) {
    await this.repository.save(article);
  }

  public async update(article: Update) {
    await this.repository.save(article);
  }
}
