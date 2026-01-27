import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { MailerService } from '../../services/mailer.service';
import { EmailJobData, isSendTemplateJob } from '../types/email-job.types';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async process(job: Job<EmailJobData>): Promise<void> {
    this.logger.log(`Processing email job ${job.id} for ${job.data.to}`);

    try {
      if (isSendTemplateJob(job.data)) {
        // Template-based email
        await this.mailerService.sendTemplate(
          job.data.to,
          job.data.subject,
          job.data.templateName,
          job.data.context,
        );
      } else {
        // Direct HTML email
        await this.mailerService.sendMail({
          to: job.data.to,
          subject: job.data.subject,
          html: job.data.html,
          text: job.data.text,
        });
      }

      this.logger.log(`Email job ${job.id} completed successfully`);
    } catch (error) {
      this.logger.error(
        `Email job ${job.id} failed: ${error instanceof Error ? error.message : String(error)}`,
        error instanceof Error ? error.stack : undefined,
      );
      throw error; // Re-throw to trigger retry
    }
  }
}
