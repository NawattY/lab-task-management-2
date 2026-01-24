import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { CoreConfigService } from '@app/core/config/config.service';
import { ThrottlerConfig } from '@app/config/throttler.config';
import { CoreConfigModule } from '@app/core/config/config.module';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [CoreConfigModule],
      inject: [CoreConfigService],
      useFactory: (configService: CoreConfigService) => {
        const config = configService.get<ThrottlerConfig>('throttler')!;
        return [
          {
            ttl: config.ttl,
            limit: config.limit,
          },
        ];
      },
    }),
  ],
  exports: [ThrottlerModule],
})
export class RateLimitModule {}
