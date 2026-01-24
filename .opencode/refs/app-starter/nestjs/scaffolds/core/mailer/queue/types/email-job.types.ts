export interface SendEmailJob {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface SendTemplateJob {
  to: string;
  subject: string;
  templateName: string;
  context: Record<string, any>;
}

export type EmailJobData = SendEmailJob | SendTemplateJob;

export function isSendTemplateJob(data: EmailJobData): data is SendTemplateJob {
  return 'templateName' in data;
}
