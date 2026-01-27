// src/modules/example/application/example.service.ts

import { Injectable, Inject } from '@nestjs/common';
import {
  EXAMPLE_DATASOURCE,
  type ExampleDatasource,
} from '../infrastructure/datasources/example.datasource.interface';
import { FindAllExampleInput } from './models/inputs/find-all-example.input';
import { CreateExampleInput } from './models/inputs/create-example.input';
import { UpdateExampleInput } from './models/inputs/update-example.input';
import { FindOneExampleInput } from './models/inputs/find-one-example.input';
import { ExampleOutput } from './models/outputs/example.output';
import { PaginatedOutput } from '@app/shared/models/paginated.output';
import { ExampleException } from '../exceptions/example.exception';

@Injectable()
export class ExampleService {
  constructor(
    @Inject(EXAMPLE_DATASOURCE)
    private readonly exampleDatasource: ExampleDatasource,
  ) {}

  async findAll(input: FindAllExampleInput): Promise<PaginatedOutput<ExampleOutput>> {
    const result = await this.exampleDatasource.findAll(input);

    return {
      items: result.items.map((entity) => ExampleOutput.fromEntity(entity)),
      meta: result.meta,
    };
  }

  async findOne(input: FindOneExampleInput): Promise<ExampleOutput> {
    const entity = await this.exampleDatasource.findById(input.id);

    if (!entity) {
      throw ExampleException.notFound();
    }

    return ExampleOutput.fromEntity(entity);
  }

  async create(input: CreateExampleInput): Promise<ExampleOutput> {
    const entity = await this.exampleDatasource.create(input);

    return ExampleOutput.fromEntity(entity);
  }

  async update(input: UpdateExampleInput): Promise<ExampleOutput> {
    // Check existence
    const existing = await this.exampleDatasource.findById(input.id);
    if (!existing) {
      throw ExampleException.notFound();
    }

    const entity = await this.exampleDatasource.update(input.id, input);

    return ExampleOutput.fromEntity(entity);
  }

  async remove(input: FindOneExampleInput): Promise<void> {
    // Check existence
    const existing = await this.exampleDatasource.findById(input.id);
    if (!existing) {
      throw ExampleException.notFound();
    }

    await this.exampleDatasource.delete(input.id);
  }
}
