import { validateAndTransformConfig } from '@app/core/config/utils/validate-config.util';
import { registerAs } from '@nestjs/config';
import { IsNumber, IsOptional } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  @IsOptional()
  THROTTLE_TTL: number = 60000; // 60 seconds

  @IsNumber()
  @IsOptional()
  THROTTLE_LIMIT: number = 10; // 10 requests
}

export interface ThrottlerConfig {
  ttl: number;
  limit: number;
}

export const throttlerConfiguration = registerAs('throttler', (): ThrottlerConfig => {
  const rawConfig = {
    THROTTLE_TTL: process.env.THROTTLE_TTL ? parseInt(process.env.THROTTLE_TTL, 10) : 60000,
    THROTTLE_LIMIT: process.env.THROTTLE_LIMIT ? parseInt(process.env.THROTTLE_LIMIT, 10) : 10,
  };

  const validatedEnv = validateAndTransformConfig(
    EnvironmentVariables,
    rawConfig,
    'Throttler Config',
  );

  return {
    ttl: validatedEnv.THROTTLE_TTL,
    limit: validatedEnv.THROTTLE_LIMIT,
  };
});
