import { z } from 'zod';
import ms from 'ms';

export const msStringValue = (defaultValue?: string) => {
  const schema = z.string().refine(
    (val) => {
      try {
        const milliseconds = ms(val as ms.StringValue);
        return typeof milliseconds === 'number' && !isNaN(milliseconds);
      } catch {
        return false;
      }
    },
    { message: 'Invalid time format (e.g., "30d", "1h", "3600s")' },
  );

  return defaultValue ? schema.default(defaultValue) : schema;
};
