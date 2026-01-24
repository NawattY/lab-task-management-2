// src/modules/example/infrastructure/datasources/example.datasource.interface.ts

import { ExampleEntity } from '../../domain/entities/example.entity';
import { FindAllExampleInput } from '../../application/models/inputs/find-all-example.input';
import { CreateExampleInput } from '../../application/models/inputs/create-example.input';
import { UpdateExampleInput } from '../../application/models/inputs/update-example.input';
import { PaginatedOutput } from '@app/shared/models/paginated.output';

/**
 * Interface Token for Dependency Injection
 */
export const EXAMPLE_DATASOURCE = Symbol('EXAMPLE_DATASOURCE');

/**
 * ExampleDatasource Interface
 *
 * ALL database operations for Example module go through this interface.
 * This enables Dependency Inversion - service doesn't know about Prisma.
 *
 * @note Uses Application Inputs (Option B: Pragmatic approach)
 */
export interface ExampleDatasource {
  /**
   * Find all examples with pagination
   */
  findAll(input: FindAllExampleInput): Promise<PaginatedOutput<ExampleEntity>>;

  /**
   * Find example by ID
   */
  findById(id: string): Promise<ExampleEntity | null>;

  /**
   * Create a new example
   */
  create(input: CreateExampleInput): Promise<ExampleEntity>;

  /**
   * Update an existing example
   */
  update(id: string, input: UpdateExampleInput): Promise<ExampleEntity>;

  /**
   * Delete an example
   */
  delete(id: string): Promise<void>;
}

