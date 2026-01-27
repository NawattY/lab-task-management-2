// src/modules/example/application/models/outputs/example.output.ts

import { ExampleEntity } from '../../../domain/entities/example.entity';

export class ExampleOutput {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(data: ExampleOutput) {
    Object.assign(this, data);
  }

  /**
   * Transform Entity to Output Model
   */
  static fromEntity(entity: ExampleEntity): ExampleOutput {
    return new ExampleOutput({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
