import { Controller, Get, Query } from '@nestjs/common'
import { QueryUserDto } from 'src/dtos/query/user.dto'
import { PaginationResponse } from 'src/libs/globals/class'
import { UserService } from './user.service'
import { User } from 'src/entities/user.entity'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async paginate(@Query() query: QueryUserDto): Promise<PaginationResponse<User>> {
    const result = await this.userService.paginate(query)
    return new PaginationResponse(result.data, result.pagination)
  }
}
