import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { SuccessInterceptor } from './interceptors/success.interceptor';
import { JwtGuard } from './guard/jwt/jwt.guard';
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
  // 很少需要手动 new 的场景，这里算一处，手动实例的场景拜托了 nest 的依赖控制
  app.useGlobalInterceptors(new SuccessInterceptor());

  // guard
  // app.useGlobalGuards(new JwtGuard(new Reflector()));

  const server = await app.listen(8080);
  server.setTimeout(3000);
}
bootstrap();
