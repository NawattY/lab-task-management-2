import { validateConfig } from '@app/core/config/utils/validate-config.util';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const redisEnvSchema = z.object({
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.coerce.number().default(0),
  REDIS_ENABLED: z.coerce.boolean().default(true),
});

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
  enabled: boolean;
}

export const redisConfiguration = registerAs('redis', (): RedisConfig => {
  const validated = validateConfig(
    redisEnvSchema,
    {
      REDIS_HOST: process.env.REDIS_HOST,
      REDIS_PORT: process.env.REDIS_PORT,
      REDIS_PASSWORD: process.env.REDIS_PASSWORD,
      REDIS_DB: process.env.REDIS_DB,
      REDIS_ENABLED: process.env.REDIS_ENABLED,
    },
    'Redis Config',
  );

  return {
    host: validated.REDIS_HOST,
    port: validated.REDIS_PORT,
    password: validated.REDIS_PASSWORD,
    db: validated.REDIS_DB,
    enabled: validated.REDIS_ENABLED,
  };
});
