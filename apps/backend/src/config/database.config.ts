import { validateConfig } from '@app/core/config/utils/validate-config.util';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const databaseEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, 'Database URL is required'),
});

export interface PrismaDatabaseConfig {
  url: string;
}

export const databaseConfiguration = registerAs(
  'database',
  (): PrismaDatabaseConfig => {
    const validated = validateConfig(
      databaseEnvSchema,
      {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      'Database Config',
    );

    return {
      url: validated.DATABASE_URL,
    };
  },
);
