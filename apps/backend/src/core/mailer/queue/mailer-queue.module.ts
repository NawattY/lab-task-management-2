import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { EmailProcessor } from './processors/email.processor';
import { CoreQueueModule } from '@app/core/queue/core-queue.module';
import { MailerQueueService } from './services/mailer-queue.service';
import { MailerModule } from '../mailer.module';

@Module({
  imports: [
    CoreQueueModule,
    MailerModule,
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  providers: [EmailProcessor, MailerQueueService],
  exports: [BullModule, MailerQueueService],
})
export class MailerQueueModule {}
