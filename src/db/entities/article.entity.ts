import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn({
    comment: '主键',
  })
  id: number;

  @Column({
    length: 50,
    comment: '文章名称',
  })
  name: string;

  @Column({
    length: 100,
    comment: '文件路径，采用直接存文件的方式进行存储，减轻MySQL负担',
  })
  contentPath: string;

  @Column({
    default: 0,
  })
  viewCount: number;

  @Column({
    default: 0,
  })
  starCount: number;

  @Column({
    length: 300,
    comment: '文章摘要',
  })
  abstract: string;

  @Column({
    comment: '文章字数',
  })
  contentCount: number;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}
