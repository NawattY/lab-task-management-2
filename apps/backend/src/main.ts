import { NestFactory } from '@nestjs/core';
import { Logger, VersioningType } from '@nestjs/common';
import { AppModule } from '@app/app.module';
import { CoreConfigService } from '@app/core/config/config.service';
import { createValidationPipe } from '@app/core/pipes';
import helmet from 'helmet';
import compression from 'compression';
import { setupSwagger } from '@app/core/swagger/swagger.setup';
import { LoggerService } from '@app/core/logger/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(LoggerService));

  const coreConfigService = app.get(CoreConfigService);
  const port = coreConfigService.getPort();
  const host = coreConfigService.getHost();

  // 🌐 Set global prefix (optional)
  app.setGlobalPrefix('api');

  // ✅ Enable shutdown hooks (for db/scheduler/etc.)
  app.enableShutdownHooks();

  // 🛡️ Optional: Enable Cors
  app.enableCors();

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.use(helmet());
  app.use(compression());

  // ✅ เปิด ValidationPipe แบบ global
  app.useGlobalPipes(createValidationPipe({ transformOptions: { enableImplicitConversion: true }}));

  setupSwagger(app);

  // ✅ Start App
  await app.listen(port, host);
  const logger = new Logger('NestApplication');
  logger.log(`🚀 App started on http://${host}:${port}/api`);
}
bootstrap();
