import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { PaginationData } from 'src/libs/globals/class'
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm'
import { BaseRepository } from './base.repository'
@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>
  ) {
    super(userRepository)
  }

  async paginate(
    whereClause: FindOptionsWhere<User> | FindOptionsWhere<User>[],
    queryClause: FindOptionsSelect<User>,
    limit: number,
    offSet: number
  ): Promise<PaginationData<User>> {
    const result = await super.paginate(whereClause, queryClause, limit, offSet)
    return new PaginationData(result.data, result.count)
  }
}
