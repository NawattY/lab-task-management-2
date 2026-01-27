// src/modules/example/api/controllers/example.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ROUTES } from '@app/routes/app-routes.constant';
import { ApiResponses } from '@app/shared/decorators/api-response.decorator';
import { ExampleService } from '../../application/example.service';
import { CreateExampleDto } from '../dtos/requests/create-example.dto';
import { UpdateExampleDto } from '../dtos/requests/update-example.dto';
import { ExampleQueryDto } from '../dtos/requests/example-query.dto';
import { ExampleResponseDto } from '../dtos/responses/example.response.dto';
import {
  createExampleResponse,
  getExampleResponse,
  listExamplesResponse,
  updateExampleResponse,
  deleteExampleResponse,
} from '../swagger';

/**
 * API Layer - Example Controller
 *
 * @rule MUST use ROUTES constant from app-routes.constant.ts
 * @rule MUST use @ApiResponses decorator (single decorator for all responses)
 * @rule NO business logic here - delegate to Service
 */
@ApiTags('Examples')
@Controller(ROUTES.V1.EXAMPLE.ROOT)
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  @ApiOperation({ summary: 'List all examples' })
  @ApiResponses(listExamplesResponse)
  async findAll(@Query() query: ExampleQueryDto) {
    return this.exampleService.findAll({
      page: query.page,
      perPage: query.perPage,
      search: query.search,
    });
  }

  @Get(ROUTES.V1.EXAMPLE.BY_ID)
  @ApiOperation({ summary: 'Get example by ID' })
  @ApiResponses(getExampleResponse)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.exampleService.findOne({ id });
  }

  @Post()
  @ApiOperation({ summary: 'Create example' })
  @ApiResponses(createExampleResponse)
  async create(@Body() dto: CreateExampleDto): Promise<ExampleResponseDto> {
    const result = await this.exampleService.create({
      title: dto.title,
      description: dto.description,
    });

    return ExampleResponseDto.fromOutput(result);
  }

  @Put(ROUTES.V1.EXAMPLE.BY_ID)
  @ApiOperation({ summary: 'Update example' })
  @ApiResponses(updateExampleResponse)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateExampleDto,
  ): Promise<ExampleResponseDto> {
    const result = await this.exampleService.update({
      id,
      title: dto.title,
      description: dto.description,
    });

    return ExampleResponseDto.fromOutput(result);
  }

  @Delete(ROUTES.V1.EXAMPLE.BY_ID)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete example' })
  @ApiResponses(deleteExampleResponse)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.exampleService.remove({ id });
  }
}
