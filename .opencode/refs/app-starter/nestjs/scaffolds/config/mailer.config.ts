import { validateAndTransformConfig } from '@app/core/config/utils/validate-config.util';
import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  MAIL_HOST!: string;

  @IsNumber()
  @IsOptional()
  MAIL_PORT: number = 587;

  @IsString()
  @IsOptional()
  MAIL_USER?: string;

  @IsString()
  @IsOptional()
  MAIL_PASSWORD?: string;

  @IsNotEmpty()
  @IsString()
  MAIL_FROM_ADDRESS!: string;

  @IsString()
  @IsOptional()
  MAIL_FROM_NAME: string = 'Phyathai';

  @IsNotEmpty()
  @IsString()
  FRONTEND_URL!: string;
}

export interface MailerConfig {
  host: string;
  port: number;
  user?: string;
  password?: string;
  fromAddress: string;
  fromName: string;
  frontendUrl: string;
}

export const mailerConfiguration = registerAs('mailer', (): MailerConfig => {
  const rawConfig = {
    MAIL_HOST: process.env.MAIL_HOST ?? 'smtp.mailtrap.io',
    MAIL_PORT: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT, 10) : 2525,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS ?? 'noreply@phyathai.com',
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME ?? 'Phyathai',
    FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  };

  const validatedEnv = validateAndTransformConfig(
    EnvironmentVariables,
    rawConfig,
    'Mailer Config',
  );

  return {
    host: validatedEnv.MAIL_HOST,
    port: validatedEnv.MAIL_PORT,
    user: validatedEnv.MAIL_USER,
    password: validatedEnv.MAIL_PASSWORD,
    fromAddress: validatedEnv.MAIL_FROM_ADDRESS,
    fromName: validatedEnv.MAIL_FROM_NAME,
    frontendUrl: validatedEnv.FRONTEND_URL,
  };
});
