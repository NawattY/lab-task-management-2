// src/modules/example/api/dtos/responses/example.response.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { ExampleOutput } from '../../../application/models/outputs/example.output';

export class ExampleResponseDto {
  @ApiProperty({ description: 'Unique identifier' })
  readonly id: string;

  @ApiProperty({ description: 'Title of the example' })
  readonly title: string;

  @ApiProperty({ description: 'Description', required: false })
  readonly description?: string;

  @ApiProperty({ description: 'Created timestamp' })
  readonly createdAt: Date;

  @ApiProperty({ description: 'Updated timestamp' })
  readonly updatedAt: Date;

  constructor(data: ExampleResponseDto) {
    Object.assign(this, data);
  }

  /**
   * Transform Output Model to Response DTO
   */
  static fromOutput(output: ExampleOutput): ExampleResponseDto {
    return new ExampleResponseDto({
      id: output.id,
      title: output.title,
      description: output.description,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    });
  }
}
