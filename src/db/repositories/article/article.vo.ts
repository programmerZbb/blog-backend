// updateTime 和 createTime 在MySQL中是有默认值的
export interface Create {
  name: string;
  contentPath: string;
  abstract: string;
  contentCount: number;
}

export interface Update {
  name: string;
  abstract: string;
  // contentPath: string;
  updateTime: Date;
  contentCount: number;
}
