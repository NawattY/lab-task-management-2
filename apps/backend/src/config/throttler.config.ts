import { validateConfig } from '@app/core/config/utils/validate-config.util';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const throttlerEnvSchema = z.object({
  THROTTLE_TTL: z.coerce.number().default(60000), // 60 seconds
  THROTTLE_LIMIT: z.coerce.number().default(10), // 10 requests
});

export interface ThrottlerConfig {
  ttl: number;
  limit: number;
}

export const throttlerConfiguration = registerAs(
  'throttler',
  (): ThrottlerConfig => {
    const validatedEnv = validateConfig(
      throttlerEnvSchema,
      {
        THROTTLE_TTL: process.env.THROTTLE_TTL,
        THROTTLE_LIMIT: process.env.THROTTLE_LIMIT,
      },
      'Throttler Config',
    );

    return {
      ttl: validatedEnv.THROTTLE_TTL,
      limit: validatedEnv.THROTTLE_LIMIT,
    };
  },
);
