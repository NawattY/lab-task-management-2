// src/modules/example/example.module.ts

import { Module } from '@nestjs/common';
import { ExampleController } from './api/controllers/example.controller';
import { ExampleService } from './application/example.service';
import { EXAMPLE_DATASOURCE } from './infrastructure/datasources/example.datasource.interface';
// import { ExamplePrismaDatasource } from './infrastructure/datasources/example.prisma.datasource';

@Module({
  controllers: [ExampleController],
  providers: [
    ExampleService,
    // {
    //   provide: EXAMPLE_DATASOURCE,
    //   useClass: ExamplePrismaDatasource,
    // },
  ],
  exports: [EXAMPLE_DATASOURCE],
})
export class ExampleModule {}
