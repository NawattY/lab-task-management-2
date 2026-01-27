import { validateConfig } from '@app/core/config/utils/validate-config.util';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const queueEnvSchema = z.object({
  QUEUE_REDIS_HOST: z.string(),
  QUEUE_REDIS_PORT: z.coerce.number().default(6379),
  QUEUE_REDIS_PASSWORD: z.string().optional(),
  QUEUE_REDIS_DB: z.coerce.number().default(1),
  QUEUE_DEFAULT_JOB_ATTEMPTS: z.coerce.number().default(3),
  QUEUE_DEFAULT_JOB_TIMEOUT: z.coerce.number().default(30000), // 30 seconds
  QUEUE_REMOVE_ON_COMPLETE: z.coerce.number().default(100),
  QUEUE_REMOVE_ON_FAIL: z.coerce.number().default(1000),
  QUEUE_ENABLED: z.boolean().default(true),
});

export interface QueueConfig {
  redis: {
    host: string;
    port: number;
    password?: string;
    db: number;
  };
  defaultJobOptions: {
    attempts: number;
    backoff: {
      type: 'exponential';
      delay: number;
    };
    timeout: number;
    removeOnComplete: boolean | number;
    removeOnFail: boolean | number;
  };
  enabled: boolean;
}

export const queueConfiguration = registerAs('queue', (): QueueConfig => {
  // Pre-process raw config to handle fallbacks before validation
  const rawConfig = {
    QUEUE_REDIS_HOST:
      process.env.QUEUE_REDIS_HOST ?? process.env.REDIS_HOST ?? 'localhost',
    QUEUE_REDIS_PORT: process.env.QUEUE_REDIS_PORT ?? process.env.REDIS_PORT,
    QUEUE_REDIS_PASSWORD:
      process.env.QUEUE_REDIS_PASSWORD ?? process.env.REDIS_PASSWORD,
    QUEUE_REDIS_DB: process.env.QUEUE_REDIS_DB,
    QUEUE_DEFAULT_JOB_ATTEMPTS: process.env.QUEUE_DEFAULT_JOB_ATTEMPTS,
    QUEUE_DEFAULT_JOB_TIMEOUT: process.env.QUEUE_DEFAULT_JOB_TIMEOUT,
    QUEUE_REMOVE_ON_COMPLETE: process.env.QUEUE_REMOVE_ON_COMPLETE,
    QUEUE_REMOVE_ON_FAIL: process.env.QUEUE_REMOVE_ON_FAIL,
    QUEUE_ENABLED: process.env.QUEUE_ENABLED !== 'false', // Manual boolean check for pre-processing
  };

  const validatedEnv = validateConfig(
    queueEnvSchema,
    rawConfig,
    'Queue Config',
  );

  return {
    redis: {
      host: validatedEnv.QUEUE_REDIS_HOST,
      port: validatedEnv.QUEUE_REDIS_PORT,
      password: validatedEnv.QUEUE_REDIS_PASSWORD,
      db: validatedEnv.QUEUE_REDIS_DB,
    },
    defaultJobOptions: {
      attempts: validatedEnv.QUEUE_DEFAULT_JOB_ATTEMPTS,
      backoff: {
        type: 'exponential',
        delay: 1000, // Start with 1 second, then 2s, 4s, etc.
      },
      timeout: validatedEnv.QUEUE_DEFAULT_JOB_TIMEOUT,
      removeOnComplete: validatedEnv.QUEUE_REMOVE_ON_COMPLETE,
      removeOnFail: validatedEnv.QUEUE_REMOVE_ON_FAIL,
    },
    enabled: validatedEnv.QUEUE_ENABLED,
  };
});
