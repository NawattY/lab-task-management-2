// // src/modules/example/infrastructure/datasources/example.prisma.datasource.ts

// import { Injectable } from '@nestjs/common';
// import { TransactionHost } from '@nestjs-cls/transactional';
// import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
// import { Example as PrismaExample } from '@prisma/client';
// import { ExampleEntity } from '../../domain/entities/example.entity';
// import { ExampleDatasource } from './example.datasource.interface';
// import { FindAllExampleInput } from '../../application/models/inputs/find-all-example.input';
// import { CreateExampleInput } from '../../application/models/inputs/create-example.input';
// import { UpdateExampleInput } from '../../application/models/inputs/update-example.input';
// import { PaginatedOutput } from '@app/shared/models/paginated.output';
// import { prismaPaginate } from '@app/shared/helpers/prisma-paginate.helper';

// /**
//  * Infrastructure Layer - Prisma Implementation
//  *
//  * @rule MUST inject TransactionHost instead of PrismaService
//  * @rule Use this.txHost.tx to access current transaction context
//  * @rule MUST implement transformEntity() method
//  */
// @Injectable()
// export class ExamplePrismaDatasource implements ExampleDatasource {
//   constructor(
//     private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
//   ) {}

//   // async findAll(input: FindAllExampleInput): Promise<PaginatedOutput<ExampleEntity>> {
//   //   return prismaPaginate(
//   //     this.txHost.tx.example,
//   //     {
//   //       where: input.search
//   //         ? { title: { contains: input.search } }
//   //         : undefined,
//   //       orderBy: { createdAt: 'desc' },
//   //     },
//   //     input,
//   //     (prismaModel) => this.transformEntity(prismaModel),
//   //   );
//   // }

//   // async findById(id: string): Promise<ExampleEntity | null> {
//   //   const example = await this.txHost.tx.example.findUnique({
//   //     where: { id },
//   //   });

//   //   return example ? this.transformEntity(example) : null;
//   // }

//   // async create(input: CreateExampleInput): Promise<ExampleEntity> {
//   //   const example = await this.txHost.tx.example.create({
//   //     data: {
//   //       title: input.title,
//   //       description: input.description,
//   //     },
//   //   });

//   //   return this.transformEntity(example);
//   // }

//   // async update(id: string, input: UpdateExampleInput): Promise<ExampleEntity> {
//   //   const example = await this.txHost.tx.example.update({
//   //     where: { id },
//   //     data: {
//   //       title: input.title,
//   //       description: input.description,
//   //     },
//   //   });

//   //   return this.transformEntity(example);
//   // }

//   // async delete(id: string): Promise<void> {
//   //   await this.txHost.tx.example.delete({
//   //     where: { id },
//   //   });
//   // }

//   // /**
//   //  * Transform Prisma model to Domain Entity
//   //  *
//   //  * CRITICAL: This is the ONLY place where Prisma types are converted to domain types.
//   //  */
//   // private transformEntity(prisma: PrismaExample): ExampleEntity {
//   //   return new ExampleEntity({
//   //     id: prisma.id,
//   //     title: prisma.title,
//   //     description: prisma.description ?? undefined,
//   //     createdAt: prisma.createdAt,
//   //     updatedAt: prisma.updatedAt,
//   //   });
//   // }
// }
