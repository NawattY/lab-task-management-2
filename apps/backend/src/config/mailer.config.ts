import { validateConfig } from '@app/core/config/utils/validate-config.util';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

// Define schema พร้อม validation และ transformation ในที่เดียว
const mailerEnvSchema = z.object({
  MAIL_HOST: z
    .string()
    .min(1, 'Mail host is required')
    .default('smtp.mailtrap.io'),
  MAIL_PORT: z.coerce.number().int().positive().default(2525),
  MAIL_USER: z.string().optional(),
  MAIL_PASSWORD: z.string().optional(),
  MAIL_FROM_ADDRESS: z
    .email('Invalid email address')
    .default('noreply@phyathai.com'),
  MAIL_FROM_NAME: z.string().default('Phyathai'),
  FRONTEND_URL: z.url('Invalid URL').default('http://localhost:3000'),
});

// Interface สำหรับ return value (optional - ถ้าต้องการ transform key names)
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
  const validatedEnv = validateConfig(
    mailerEnvSchema,
    {
      MAIL_HOST: process.env.MAIL_HOST,
      MAIL_PORT: process.env.MAIL_PORT,
      MAIL_USER: process.env.MAIL_USER,
      MAIL_PASSWORD: process.env.MAIL_PASSWORD,
      MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
      MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
      FRONTEND_URL: process.env.FRONTEND_URL,
    },
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
