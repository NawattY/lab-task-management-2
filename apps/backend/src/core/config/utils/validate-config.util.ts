import { ZodError, z } from 'zod';

/**
 * Validates configuration using Zod schema
 */
export function validateConfig<T extends z.ZodTypeAny>(
  schema: T,
  rawConfig: Record<string, any>,
  configNamespace: string = 'Configuration',
): z.infer<T> {
  try {
    return schema.parse(rawConfig);
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.issues
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join('; ');
      throw new Error(
        `[${configNamespace}] ENV Validation failed: ${messages}`,
      );
    }
    throw error;
  }
}
