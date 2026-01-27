import { validateConfig } from '@app/core/config/utils/validate-config.util';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const loggerEnvSchema = z.object({
  LOG_LEVEL: z.string().default('debug'),
  LOG_PRETTY: z.string().default('true'), // Keeping as string to match original logic, or could be coerced boolean
});

export interface LoggerConfig {
  level: string;
  isPretty: boolean;
}

export const loggerConfiguration = registerAs('logger', (): LoggerConfig => {
  const validated = validateConfig(
    loggerEnvSchema,
    {
      LOG_LEVEL: process.env.LOG_LEVEL,
      LOG_PRETTY: process.env.LOG_PRETTY,
    },
    'Logger Config',
  );

  return {
    level: validated.LOG_LEVEL,
    isPretty: validated.LOG_PRETTY === 'true',
  };
});
