// src/modules/example/domain/entities/example.entity.ts

/**
 * ExampleEntity — Rich Domain Object
 * 
 * This is a domain entity, not a Prisma model.
 * Use this for business logic and domain rules.
 */
export class ExampleEntity {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(data: ExampleEntity) {
    Object.assign(this, data);
  }

  /**
   * Domain logic example: Check if entity is recently created
   */
  isRecentlyCreated(): boolean {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    return this.createdAt > oneDayAgo;
  }

  /**
   * Domain logic example: Check if entity has description
   */
  hasDescription(): boolean {
    return !!this.description && this.description.trim().length > 0;
  }
}
