// jwt守卫，需要鉴权的请求都需要通过这个
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Observable, catchError, throwError, map } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

import { OauthService } from '../../modules/oauth/oauth.service';
import { User } from '../../proto-types/oauth2Gprc';
import { NEED_AUTH } from './auth.decorator';

/**
 * 一个 jwt 守卫，用来控制登录权限的
 */
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(OauthService) private oauthService: OauthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const reqType = context.getType();
    // context.getHandler();
    // 如果设置了不需要鉴权的接口，不走鉴权的逻辑
    // 方法设置优先级高于 class。前面的优先级最高，后面不会覆盖了
    const needAuth =
      this.reflector.getAllAndOverride<boolean>(NEED_AUTH, [
        context.getHandler(),
        context.getClass(),
      ]) ?? true;
    // 如果不需要鉴权，直接通过
    if (!needAuth) {
      return true;
    }

    if (reqType === 'http') {
      const req = context.switchToHttp().getRequest<Request & { user: User }>();
      const authHeader = req.header('authorization') || '';
      const authInfo = authHeader.split(' ');
      if (authInfo[1] == null) {
        throw new UnauthorizedException('未认证');
      }
      const token = authInfo[1];

      return this.oauthService.verifyToken(token).pipe(
        map((user) => {
          req.user = user;
          return true;
        }),
        catchError((error) => {
          // 这里抛出一个rxjs的错误，交个nest controller处理
          return throwError(
            () => new UnauthorizedException('登录token失效，请重新登录'),
          );
        }),
      );

      // try {
      //   // 验证成功把信息注入到上下文中，方便后续请求读取
      //   this.oauthService.verifyToken(token);
      //   const user = this.jwtService.verify(token);
      //   req.user = user;
      //   return true;
      // } catch (err) {
      //   throw new UnauthorizedException('登录token失效，请重新登录');
      // }
    }

    return true;
  }
}
