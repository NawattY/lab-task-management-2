import { validateAndTransformConfig } from '@app/core/config/utils/validate-config.util';
import { registerAs } from '@nestjs/config';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  QUEUE_REDIS_HOST!: string;

  @IsNumber()
  @IsOptional()
  QUEUE_REDIS_PORT: number = 6379;

  @IsString()
  @IsOptional()
  QUEUE_REDIS_PASSWORD?: string;

  @IsNumber()
  @IsOptional()
  QUEUE_REDIS_DB: number = 1; // Use different DB from cache

  @IsNumber()
  @IsOptional()
  QUEUE_DEFAULT_JOB_ATTEMPTS: number = 3;

  @IsNumber()
  @IsOptional()
  QUEUE_DEFAULT_JOB_TIMEOUT: number = 30000; // 30 seconds

  @IsNumber()
  @IsOptional()
  QUEUE_REMOVE_ON_COMPLETE: number = 100;

  @IsNumber()
  @IsOptional()
  QUEUE_REMOVE_ON_FAIL: number = 1000;

  @IsBoolean()
  @IsOptional()
  QUEUE_ENABLED: boolean = true;
}

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
  const rawConfig = {
    QUEUE_REDIS_HOST: process.env.QUEUE_REDIS_HOST ?? process.env.REDIS_HOST ?? 'localhost',
    QUEUE_REDIS_PORT: process.env.QUEUE_REDIS_PORT
      ? parseInt(process.env.QUEUE_REDIS_PORT, 10)
      : process.env.REDIS_PORT
        ? parseInt(process.env.REDIS_PORT, 10)
        : 6379,
    QUEUE_REDIS_PASSWORD: process.env.QUEUE_REDIS_PASSWORD ?? process.env.REDIS_PASSWORD,
    QUEUE_REDIS_DB: process.env.QUEUE_REDIS_DB ? parseInt(process.env.QUEUE_REDIS_DB, 10) : 1,
    QUEUE_DEFAULT_JOB_ATTEMPTS: process.env.QUEUE_DEFAULT_JOB_ATTEMPTS
      ? parseInt(process.env.QUEUE_DEFAULT_JOB_ATTEMPTS, 10)
      : 3,
    QUEUE_DEFAULT_JOB_TIMEOUT: process.env.QUEUE_DEFAULT_JOB_TIMEOUT
      ? parseInt(process.env.QUEUE_DEFAULT_JOB_TIMEOUT, 10)
      : 30000,
    QUEUE_REMOVE_ON_COMPLETE: process.env.QUEUE_REMOVE_ON_COMPLETE
      ? parseInt(process.env.QUEUE_REMOVE_ON_COMPLETE, 10)
      : 100,
    QUEUE_REMOVE_ON_FAIL: process.env.QUEUE_REMOVE_ON_FAIL
      ? parseInt(process.env.QUEUE_REMOVE_ON_FAIL, 10)
      : 1000,
    QUEUE_ENABLED: process.env.QUEUE_ENABLED !== 'false',
  };

  const validatedEnv = validateAndTransformConfig(
    EnvironmentVariables,
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
