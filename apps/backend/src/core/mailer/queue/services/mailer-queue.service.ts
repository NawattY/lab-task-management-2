import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CoreConfigService } from '@app/core/config/config.service';
import { QueueConfig } from '@app/config/queue.config';
import { SendEmailJob, SendTemplateJob } from '../types/email-job.types';
import { SendMailOptions } from 'nodemailer';

@Injectable()
export class MailerQueueService {
  private readonly logger = new Logger(MailerQueueService.name);
  private readonly queueConfig: QueueConfig;

  constructor(
    @InjectQueue('email') private readonly emailQueue: Queue,
    private readonly configService: CoreConfigService,
  ) {
    this.queueConfig = this.configService.get<QueueConfig>('queue')!;
  }

  async queueMail(options: SendMailOptions): Promise<void> {
    if (!this.queueConfig.enabled) {
      throw new Error('Queue is disabled');
    }

    try {
      await this.emailQueue.add('send-email', {
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      } as SendEmailJob);

      this.logger.log(`Queued email for ${options.to}`);
    } catch (error) {
      this.logger.error(`Failed to queue email for ${options.to}`, error);
      throw error;
    }
  }

  async queueTemplate(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, any>,
  ): Promise<void> {
    if (!this.queueConfig.enabled) {
      throw new Error('Queue is disabled');
    }

    try {
      await this.emailQueue.add('send-template', {
        to,
        subject,
        templateName,
        context,
      } as SendTemplateJob);

      this.logger.log(`Queued template email '${templateName}' for ${to}`);
    } catch (error) {
      this.logger.error(`Failed to queue template email for ${to}`, error);
      throw error;
    }
  }
}
