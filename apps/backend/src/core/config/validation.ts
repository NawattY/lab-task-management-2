import { z } from 'zod';
import { validateConfig } from './utils/validate-config.util';

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(['local', 'develop', 'staging', 'uat', 'production', 'test'])
      .default('local'),
    APP_HOST: z.string().default('localhost'),
    APP_PORT: z.coerce.number().default(3000),
    APP_NAME: z.string().min(1, 'APP_NAME is required'),
  })
  .loose();

export function validate(config: Record<string, unknown>) {
  return validateConfig(envSchema, config, 'Root Environment');
}
