// src/modules/example/api/dtos/requests/example-query.dto.ts

import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginateQueryDto } from '@app/shared/dto/paginate-query.dto';

export class ExampleQueryDto extends PaginateQueryDto {
  @ApiPropertyOptional({
    description: 'Search by title',
    example: 'example',
  })
  @IsOptional()
  @IsString()
  readonly search?: string;
}
