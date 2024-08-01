import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserController } from './app/v1/user/user.controller'
import { UserModule } from './app/v1/user/user.module'
import { UserService } from './app/v1/user/user.service'
import typeormConfig from './libs/utils/typeorm.config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeormConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('typeorm')
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 15
      }
    ]),
    UserModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService]
})
export class AppModule {}
