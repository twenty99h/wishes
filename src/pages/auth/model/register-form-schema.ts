import { z } from 'zod';

export const registerFormSchema = z
  .object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Пароли не совпадают',
      });
    }
  });

export type RegisterForm = z.infer<typeof registerFormSchema>;
