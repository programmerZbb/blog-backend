import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ArticleListDto {
  @IsNotEmpty()
  @IsNumberString()
  page: number;

  @IsNotEmpty()
  @IsNumberString()
  pageSize: number;
}

export class ArticleDetailDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
