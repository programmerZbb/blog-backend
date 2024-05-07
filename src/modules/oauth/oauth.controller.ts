import {
  Controller,
  Get,
  Inject,
  Query,
  UnauthorizedException,
  UseFilters,
  BadRequestException,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { ClientGrpc, RpcException } from '@nestjs/microservices';

import { RpcExceptionFilter } from '../../exception-filter/rcp-exception.filter';
import { NeedAuth } from '../../guard/jwt/auth.decorator';
import { OauthService } from './oauth.service';

@NeedAuth(false)
@UseFilters(RpcExceptionFilter)
@Controller('oauth')
export class OauthController {
  @Inject(OauthService)
  private oauthService: OauthService;

  @Get('oauth')
  public async testOauth(@Query('token') token: string) {
    // rxjs失败处理，必须如下，要不然没法结束，参考：https://stackoverflow.com/questions/72152120/how-to-handle-rpcexception-in-nestjs
    // 不能通过一般的try方式捕获这种错误
    return this.oauthService.verifyToken(token).pipe(
      catchError((error) => {
        // console.log(error, '--000');
        // grpc 返回的错误格式，参考：https://blog.csdn.net/u012107512/article/details/80095625
        /**
         *  code: 4,
            details: 'token失效！',
         */
        // 这里抛出一个rxjs的错误，交个nest controller处理
        return throwError(() => new UnauthorizedException('token失效！'));
      }),
    );
    // return this.oauthService.getHero();
  }

  @Get('token')
  public async getToken(@Query('code') code: string) {
    return this.oauthService
      .getToken({
        clientId: 'L_tKvfchDbkQIRe_rAJCHQ',
        clientSecret: 'fjuVLMWrYCkHwUK1d7jOA',
        code,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new BadRequestException('code验证失败！')),
        ),
      );
  }
}
