import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  Body,
  Inject,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { storage, memoryStorage } from './storage';
import { UploadDto } from './upload.dto';
import { UploadService } from './upload.service';

@Controller()
export class UploadController {
  @Inject(UploadService)
  private uploadService: UploadService;

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      limits: {
        fieldSize: 100 * 1024,
      },
    }),
  )
  @HttpCode(200)
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadDto,
  ) {
    // console.log(file, body);
    await this.uploadService.save({
      name: file.filename,
      contentPath: file.path,
      abstract: '',
      contentCount: 0,
    });

    return '上传成功';
  }

  // 只能用buffer的方式来进行动态path写入了
  @Post('upload-buffer')
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage,
      limits: {
        fieldSize: 100 * 1024,
      },
    }),
  )
  @HttpCode(200)
  public async uploadFileBuffer(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadDto,
  ) {
    console.log(file, body);
    const { path, name, abstract, contentCount } =
      await this.uploadService.writeFile(file.originalname, file.buffer);
    await this.uploadService.save({
      name: body.filename,
      contentPath: path,
      abstract,
      contentCount,
    });

    return '上传成功';
  }
}
