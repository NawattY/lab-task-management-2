import { validateConfig } from '@app/core/config/utils/validate-config.util';
import { msStringValue } from '@app/core/config/utils/validators/ms-string-value';
import { registerAs } from '@nestjs/config';
import ms from 'ms';
import { z } from 'zod';

const authEnvSchema = z.object({
  JWT_ACCESS_SECRET: z.string().min(1, 'JWT Access Secret is required'),
  JWT_ACCESS_EXPIRES_IN: msStringValue('3600s'),
  JWT_REFRESH_SECRET: z.string().min(1, 'JWT Refresh Secret is required'),
  JWT_REFRESH_EXPIRES_IN: msStringValue('30d'),
  PASSWORD_RESET_EXPIRES_IN: msStringValue('24h'),
});

export interface AuthConfig {
  jwtAccessSecret: string;
  jwtAccessExpiresIn: ms.StringValue;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: ms.StringValue;
  passwordResetExpiresIn: ms.StringValue;
  passwordResetTtlMs: number;
}

export const authConfiguration = registerAs('auth', (): AuthConfig => {
  const validatedEnv = validateConfig(
    authEnvSchema,
    {
      JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
      JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
      JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
      JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
      PASSWORD_RESET_EXPIRES_IN: process.env.PASSWORD_RESET_EXPIRES_IN,
    },
    'Auth Config',
  );

  return {
    jwtAccessSecret: validatedEnv.JWT_ACCESS_SECRET,
    jwtAccessExpiresIn: validatedEnv.JWT_ACCESS_EXPIRES_IN as ms.StringValue,
    jwtRefreshSecret: validatedEnv.JWT_REFRESH_SECRET,
    jwtRefreshExpiresIn: validatedEnv.JWT_REFRESH_EXPIRES_IN as ms.StringValue,
    passwordResetExpiresIn:
      validatedEnv.PASSWORD_RESET_EXPIRES_IN as ms.StringValue,
    passwordResetTtlMs: ms(
      validatedEnv.PASSWORD_RESET_EXPIRES_IN as ms.StringValue,
    ),
  };
});
