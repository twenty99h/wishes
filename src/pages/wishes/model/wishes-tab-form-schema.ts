import { z } from 'zod';

export const wishesTabFormSchema = z.object({
  title: z.string().min(3, 'Минимум 3 символа'),
});

export type WishesTabForm = z.infer<typeof wishesTabFormSchema>;
