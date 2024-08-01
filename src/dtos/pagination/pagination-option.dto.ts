import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator'
import { OrderBy } from 'src/libs/utils/enums'

export class PaginationOptionsDto {
  @ApiPropertyOptional({ enum: OrderBy, default: OrderBy.ASC })
  @IsEnum(OrderBy)
  @IsOptional()
  readonly orderBy?: OrderBy = OrderBy.ASC

  @ApiPropertyOptional({
    minimum: 1,
    default: 1
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  readonly page: number = 1

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly pageSize?: number = 10

  constructor(page?: number, pageSize?: number) {
    ;(this.page = page), (this.pageSize = pageSize)
  }
}
