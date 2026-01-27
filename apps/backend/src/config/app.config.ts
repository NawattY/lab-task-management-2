import { validateConfig } from '@app/core/config/utils/validate-config.util';
import { msStringValue } from '@app/core/config/utils/validators/ms-string-value';
import { registerAs } from '@nestjs/config';
import ms from 'ms';
import { z } from 'zod';

const appEnvSchema = z.object({
  USER_ACTIVATION_EXPIRES_IN: msStringValue('7d'),
});

// Export Interface เพื่อ Type Hint
export interface AppConfig {
  userActivationExpiresIn: ms.StringValue;
  userActivationTtlMs: number; // in milliseconds
}

// Configuration Factory
export const appConfiguration = registerAs('app', (): AppConfig => {
  // 1. เรียกใช้ Utility Function กลางในการ Validate และ Transform
  const validatedEnv = validateConfig(
    appEnvSchema,
    {
      USER_ACTIVATION_EXPIRES_IN: process.env.USER_ACTIVATION_EXPIRES_IN,
    },
    'App Config', // Namespace สำหรับ Error Message
  );

  // 2. Return ค่าที่ผ่านการ Validate และอาจจะมีการปรับแต่งเพิ่มเติม
  return {
    userActivationExpiresIn:
      validatedEnv.USER_ACTIVATION_EXPIRES_IN as ms.StringValue,
    userActivationTtlMs: ms(
      validatedEnv.USER_ACTIVATION_EXPIRES_IN as ms.StringValue,
    ),
  };
});
