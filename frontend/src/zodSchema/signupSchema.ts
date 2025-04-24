import { z } from 'zod';

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, 'Username must be at least 2 characters')
    .max(15, 'Username must not be more than 15 characetrs'),
  email: z.string().email({ message: 'Invalid email address' }),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be 10 digits')
    .max(10, 'Phone number must be 10 digits'),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['student', 'instructor'], {
    required_error: 'Role is required',
  }),
});
