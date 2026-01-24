// src/core/swagger/swagger.setup.ts

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

/**
 * Setup Swagger documentation
 * 
 * Usage in main.ts:
 * ```ts
 * import { setupSwagger } from '@app/core/swagger/swagger.setup';
 * 
 * async function bootstrap() {
 *   const app = await NestFactory.create(AppModule);
 *   setupSwagger(app);
 *   await app.listen(3000);
 * }
 * ```
 */
export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Project Name API') // TODO: Replace with actual project name
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
