import { PaginationData } from 'src/libs/globals/class'
import { BaseEntity, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm'

export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  constructor(protected readonly baseRepository: Repository<T>) {
    super(baseRepository.target, baseRepository.manager, baseRepository.queryRunner)
  }
  async paginate(
    whereClause: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    queryClause: FindOptionsSelect<T>,
    limit: number,
    offSet: number
  ): Promise<PaginationData<T>> {
    const [data, count] = await this.baseRepository.findAndCount({
      where: whereClause,
      select: queryClause,
      take: limit,
      skip: offSet
    })

    return new PaginationData(data, count)
  }
}
