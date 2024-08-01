import { PartialType } from '@nestjs/mapped-types'
import { IsOptional, IsString } from 'class-validator'
import { PaginationOptionsDto } from '../pagination/pagination-option.dto'

export class QueryUserDto extends PartialType(PaginationOptionsDto) {
  @IsOptional()
  @IsString()
  readonly search_text?: string = ''
}
