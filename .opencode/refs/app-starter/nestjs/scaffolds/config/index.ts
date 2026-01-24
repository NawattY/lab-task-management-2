import { authConfiguration } from './auth.config';
import { databaseConfiguration } from './database.config';
import { loggerConfiguration } from './logger.config';
import { redisConfiguration } from './redis.config';
import { mailerConfiguration } from './mailer.config';
import { queueConfiguration } from './queue.config';
import { throttlerConfiguration } from './throttler.config';
import { appConfiguration } from './app.config';

export default [
  authConfiguration,
  databaseConfiguration,
  loggerConfiguration,
  redisConfiguration,
  mailerConfiguration,
  queueConfiguration,
  throttlerConfiguration,
  appConfiguration,
];
