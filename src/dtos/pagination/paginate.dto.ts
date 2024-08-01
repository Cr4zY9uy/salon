import { ApiProperty } from '@nestjs/swagger'
import { PaginationOptionsDto } from './pagination-option.dto'

export class PaginationDto {
  @ApiProperty()
  readonly page: number

  @ApiProperty()
  readonly pageSize: number

  @ApiProperty()
  readonly itemCount: number

  @ApiProperty()
  readonly pageCount: number

  @ApiProperty()
  readonly hasPreviousPage: boolean

  @ApiProperty()
  readonly hasNextPage: boolean

  constructor(pageOptionsDto: PaginationOptionsDto, itemCount: number, pageSize: number) {
    this.page = pageOptionsDto.page
    this.pageSize = pageSize
    this.itemCount = itemCount
    this.pageCount = Math.ceil(this.itemCount / this.pageSize)
    this.hasPreviousPage = this.page > 1
    this.hasNextPage = this.page < this.pageCount
  }
}
