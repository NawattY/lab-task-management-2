import { validateAndTransformConfig } from '@app/core/config/utils/validate-config.util';
import { IsMsDuration } from '@app/shared/validators/is-ms-duration.validator';
import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import * as ms from 'ms';

class EnvironmentVariables {
  @IsString()
  @IsOptional()
  @IsMsDuration()
  USER_ACTIVATION_EXPIRES_IN: ms.StringValue = '7d';
}

// Export Interface เพื่อ Type Hint
export interface AppConfig {
  userActivationExpiresIn: ms.StringValue;
  userActivationTtlMs: number; // in milliseconds
}

// Configuration Factory
export const appConfiguration = registerAs('app', (): AppConfig => {
  // 1. รวบรวมค่า Config ดิบจาก process.env
  const rawConfig = {
    USER_ACTIVATION_EXPIRES_IN: process.env.USER_ACTIVATION_EXPIRES_IN ?? '7d',
  };

  // 2. เรียกใช้ Utility Function กลางในการ Validate และ Transform
  const validatedEnv = validateAndTransformConfig(
    EnvironmentVariables, // Class ที่ใช้ Validate
    rawConfig, // ข้อมูลดิบ
    'App Config', // Namespace สำหรับ Error Message
  );

  // 3. Return ค่าที่ผ่านการ Validate และอาจจะมีการปรับแต่งเพิ่มเติม
  return {
    userActivationExpiresIn: validatedEnv.USER_ACTIVATION_EXPIRES_IN,
    userActivationTtlMs: ms(validatedEnv.USER_ACTIVATION_EXPIRES_IN as ms.StringValue),
  };
});
