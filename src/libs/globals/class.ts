import { HttpException } from '@nestjs/common'
import { PaginationDto } from 'src/dtos/pagination/paginate.dto'

export class DataResponse<T> {
  readonly data?: T

  readonly statusCode: number

  readonly message?: string

  constructor(statusCode: number, data?: T, message?: string) {
    if (statusCode === 200 || statusCode === 201) {
      this.statusCode = statusCode
      this.data = data
      this.message = message
    } else {
      throw new HttpException({ statusCode: statusCode, message: message, data }, statusCode)
    }
  }
}

export class PaginationResponse<T> {
  readonly data?: T[] | []

  readonly pagination?: PaginationDto

  constructor(data: T[] | [], pagination?: PaginationDto) {
    this.data = data
    this.pagination = pagination
  }
}

export class PaginationData<T> {
  readonly data: T[] | []

  readonly count: number

  constructor(data: T[] | [], count: number) {
    this.data = data
    this.count = count
  }
}
