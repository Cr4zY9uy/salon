import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { UserRepository } from 'src/repositories/user.repository'
import { Repository } from 'typeorm'
import { UserController } from './user.controller'
import { UserService } from './user.service'
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository, Repository],
  exports: [UserService, UserRepository, Repository]
})
export class UserModule {}
