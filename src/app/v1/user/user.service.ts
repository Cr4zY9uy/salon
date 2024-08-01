import { Injectable } from '@nestjs/common'
import { PaginationDto } from 'src/dtos/pagination/paginate.dto'
import { PaginationOptionsDto } from 'src/dtos/pagination/pagination-option.dto'
import { QueryUserDto } from 'src/dtos/query/user.dto'
import { User } from 'src/entities/user.entity'
import { PaginationResponse } from 'src/libs/globals/class'
import { UserRepository } from 'src/repositories/user.repository'
import { Like } from 'typeorm'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async paginate(query: QueryUserDto): Promise<PaginationResponse<User>> {
    const result = await this.userRepository.paginate(
      query.search_text ? { username: Like(`%${query.search_text}%`) } : {},
      { google_id: true },
      query.pageSize,
      query.page ? (query.page - 1) * query.pageSize : 0
    )

    return new PaginationResponse(
      result.data,
      new PaginationDto(new PaginationOptionsDto(query.page), result.count, query.pageSize)
    )
  }
}
