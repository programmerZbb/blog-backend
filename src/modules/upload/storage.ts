import * as multer from 'multer';
import * as moment from 'moment';
import { Buffer } from 'buffer';

type StrEncoding = Parameters<Buffer['toString']>[0];

// 参考：https://github.com/expressjs/multer/issues/1104
export const string2utf8 = (
  str: string,
  encoding: StrEncoding = 'latin1',
): string => {
  return Buffer.from(str, encoding).toString('utf-8');
};

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // 修改上传文件名称
  filename: function (req, file, cb) {
    cb(
      null,
      moment().format('YYYY_MM_DD') + '-' + string2utf8(file.originalname),
    );
  },
});

export const memoryStorage = multer.memoryStorage();
