import { BullModule } from '@nestjs/bullmq';
import { Module, Global } from '@nestjs/common';
import { CoreConfigService } from '@app/core/config/config.service';
import { QueueConfig } from '@app/config/queue.config';
import { CoreConfigModule } from '@app/core/config/config.module';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [CoreConfigModule],
      inject: [CoreConfigService],
      useFactory: (configService: CoreConfigService) => {
        const queueConfig = configService.get<QueueConfig>('queue')!;
        return {
          connection: {
            host: queueConfig.redis.host,
            port: queueConfig.redis.port,
            password: queueConfig.redis.password,
            db: queueConfig.redis.db,
          },
          defaultJobOptions: queueConfig.defaultJobOptions,
        };
      },
    }),
  ],
  exports: [BullModule],
})
export class CoreQueueModule {}
