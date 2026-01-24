import { Injectable, Logger } from '@nestjs/common';
import { CoreConfigService } from '@app/core/config/config.service';
import { MailerConfig } from '@app/config/mailer.config';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private transporter!: nodemailer.Transporter;
  private readonly config: MailerConfig;

  constructor(
    private readonly configService: CoreConfigService,
  ) {
    this.config = this.configService.get<MailerConfig>('mailer')!;
    this.createTransporter();
  }

  private createTransporter() {
    this.transporter = nodemailer.createTransport({
      host: this.config.host,
      port: this.config.port,
      secure: this.config.port === 465, // true for 465, false for other ports
      auth: this.config.user && this.config.password
        ? {
            user: this.config.user,
            pass: this.config.password,
          }
        : undefined,
    });

    this.logger.log(`Mailer configured with host: ${this.config.host}:${this.config.port}`);
  }

  async sendMail(options: SendMailOptions): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: `"${this.config.fromName}" <${this.config.fromAddress}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });

      this.logger.log(`Email sent to ${options.to}: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${options.to}`, error);
      throw error;
    }
  }

  async sendTemplate(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, any>,
  ): Promise<void> {
    // Path from dist/core/mailer/services to dist/templates/emails
    const templatePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'templates',
      'emails',
      `${templateName}.hbs`,
    );

    this.logger.debug(`Looking for template at: ${templatePath}`);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Email template not found: ${templateName} at ${templatePath}`);
    }

    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(templateSource);
    const html = template(context);

    await this.sendMail({ to, subject, html });
  }
}
