import { z } from 'zod';

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, 'Please provide a valid phone number'),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Password must be at least 6 characters' }),
});
