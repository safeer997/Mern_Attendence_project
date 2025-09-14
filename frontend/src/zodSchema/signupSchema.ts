import { z } from 'zod';

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, 'Username must be at least 2 characters')
    .max(50, 'Username must not be more than 50 characetrs'),
  email: z.string().email({ message: 'Invalid email address' }),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be 10 digits')
    .max(10, 'Phone number must be 10 digits'),
  password: z
    .string()
    .min(2, { message: 'Password must be at least 2 characters' }),
  role: z.enum(['student', 'instructer'], {
    required_error: 'Role is required',
  }),
});
