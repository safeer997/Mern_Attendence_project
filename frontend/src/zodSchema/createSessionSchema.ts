import { z } from 'zod';

export const createSessionSchema = z.object({
  topic: z
    .string()
    .min(1, { message: 'Session topic is required.' })
    .max(100, { message: 'Session topic cannot exceed 100 characters.' }),

  sessionDate: z
    .string()
    .min(1, { message: 'Session date is required.' })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format.',
    }),

  onlineStudents: z
    .array(z.string())
    .optional()
    .refine((students) => students.length <= 20, {
      message: 'You can select up to 10 students.',
    }),
});
