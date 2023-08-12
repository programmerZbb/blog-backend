import { Injectable, Inject } from '@nestjs/common';
import * as multer from 'multer';
import * as moment from 'moment';
import * as fs from 'fs';
import { Buffer } from 'buffer';
import * as cheerio from 'cheerio';
import * as showdown from 'showdown';

import { Create } from '../../db/repositories/article/article.vo';
import { ArticleRepository } from '../../db/repositories/article/article.repository';
import { ConfigService } from '../config/config.service';

type StrEncoding = Parameters<Buffer['toString']>[0];

@Injectable()
export class UploadService {
  @Inject(ConfigService)
  private configService: ConfigService;

  @Inject(ArticleRepository)
  private articleRepository: ArticleRepository;

  // 参考：https://github.com/expressjs/multer/issues/1104
  public string2utf8 = (
    str: string,
    encoding: StrEncoding = 'latin1',
  ): string => {
    return Buffer.from(str, encoding).toString('utf-8');
  };

  public getStorage() {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.configService.getUploadPath());
      },
      // 修改上传文件名称
      filename: function (req, file, cb) {
        cb(
          null,
          moment().format('YYYY_MM_DD') +
            '-' +
            this.string2utf8(file.originalname),
        );
      },
    });
  }

  // todo 分片上传
  public getMemoryStorage() {
    return multer.memoryStorage();
  }

  // 获取md文件摘要
  public getMdInfo(content: string): {
    abstract: string;
    count: number;
  } {
    const converter = new showdown.Converter();
    const $ = cheerio.load(converter.makeHtml(content));
    const text = $('body').text();
    return {
      abstract: text.slice(0, 101),
      count: text.length,
    };
  }

  public writeFile(filename: string, buffer: Buffer) {
    const name = this.string2utf8(filename);
    const path = this.configService.getUploadPath() + name;

    return new Promise<{
      name: string;
      path: string;
      abstract: string;
      contentCount: number;
    }>((resolve, reject) => {
      fs.writeFile(path, buffer, (err) => {
        if (err != null) {
          throw err;
        }
        const { abstract, count } = this.getMdInfo(buffer.toString('utf-8'));
        resolve({
          name,
          path,
          abstract,
          contentCount: count,
        });
      });
    });
  }

  // 保存数据库
  public save(article: Create) {
    return this.articleRepository.create(article);
  }
}
