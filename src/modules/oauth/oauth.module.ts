import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve, join } from 'path';
import { JwtModule } from '@nestjs/jwt';

import { protobufPackage } from '../../proto-types/oauth2Gprc';
import { ConfigService } from '../config/config.service';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      // 注册 grpc 服务
      {
        name: 'GRPC_service',
        transport: Transport.GRPC,
        options: {
          package: 'oauth2Gprc',
          protoPath: resolve(__dirname, '../../proto/oauth2Gprc.proto'),
          url: '127.0.0.1:8081',
        },
      },
    ]),
    // 注册jwtModule，以便使用jwt service
    {
      ...JwtModule.registerAsync({
        async useFactory(configService: ConfigService) {
          return await configService.getJwtConf();
        },
        inject: [ConfigService],
      }),
      global: true,
    },
  ],
  controllers: [OauthController],
  providers: [OauthService],
  exports: [OauthService],
})
export class OauthModule {}
