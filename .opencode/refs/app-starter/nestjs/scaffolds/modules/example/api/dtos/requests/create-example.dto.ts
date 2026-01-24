// src/modules/example/api/dtos/requests/create-example.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateExampleDto {
  @ApiProperty({
    description: 'Title of the example',
    example: 'My Example',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly title!: string;

  @ApiProperty({
    description: 'Description of the example',
    example: 'This is an example description',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  readonly description?: string;
}
