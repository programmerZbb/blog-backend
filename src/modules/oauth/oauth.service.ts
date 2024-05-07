import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { Observable, catchError, throwError } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

import {
  Oauth2ServiceClient,
  OAUTH2_SERVICE_NAME,
  User,
  protobufPackage,
  AuthInfo,
} from '../../proto-types/oauth2Gprc';

@Injectable()
export class OauthService {
  private oauth2Service: Oauth2ServiceClient;

  constructor(@Inject('GRPC_service') private client: ClientGrpc) {}

  onModuleInit() {
    this.oauth2Service =
      this.client.getService<Oauth2ServiceClient>(OAUTH2_SERVICE_NAME);
  }

  verifyToken(token: string): Observable<User> {
    const metadata = new Metadata();
    metadata.add('Set-Cookie', 'yummy_cookie=choco');

    return this.oauth2Service.verifyToken({
      token,
    });
  }

  getToken(authInfo: AuthInfo) {
    return this.oauth2Service.verifyAuthCode(authInfo);
  }
}
