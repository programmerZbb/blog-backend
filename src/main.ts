import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { SuccessInterceptor } from './interceptors/success.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: process.env.NODE_ENV === 'development',
  });
  // 全局前缀
  app.setGlobalPrefix('api');
  // 参数验证
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // 中间件
  app.use(cookieParser());

  // interceptor
  app.useGlobalInterceptors(new SuccessInterceptor());

  const server = await app.listen(8080);
  server.setTimeout(3000);
}
bootstrap();
