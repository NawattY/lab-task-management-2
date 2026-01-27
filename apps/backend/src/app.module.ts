import { CoreConfigModule } from '@app/core/config/config.module';
import { CoreDatabaseModule } from '@app/core/database/database.module';
import { LoggerModule } from '@app/core/logger/logger.module';
import { MailerModule } from '@app/core/mailer/mailer.module';
import { RateLimitModule } from '@app/core/rate-limit/rate-limit.module';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { CoreQueueModule } from '@app/core/queue/core-queue.module';
import { QueueBoardModule } from '@app/core/queue/queue-board.module';
import { MailerQueueModule } from '@app/core/mailer/queue/mailer-queue.module';
import { GlobalSerializerInterceptor } from '@app/core/interceptors/global-serializer.interceptor';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '@app/core/exceptions/http-exception.filter';
import { CoreAuthModule } from '@app/core/auth/core-auth.module';
import { HttpLoggerInterceptor } from '@app/core/logger/interceptors/http-logger.interceptor';
import { CacheModule } from '@app/core/cache/cache.module';
import { CoreEventModule } from '@app/core/event/core-event.module';
import { ExampleModule } from '@app/modules/example/example.module';

@Module({
  imports: [
    CoreConfigModule,
    CoreDatabaseModule,
    CacheModule,
    CoreAuthModule,
    CoreEventModule,
    CoreQueueModule,
    QueueBoardModule,
    BullBoardModule.forFeature({
      name: 'email',
      adapter: BullMQAdapter,
    }),
    MailerModule,
    MailerQueueModule,
    RateLimitModule,
    LoggerModule,

    // Domain Modules
    // ExampleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },

  ],
})
export class AppModule {}
