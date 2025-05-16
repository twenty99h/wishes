import { z } from 'zod';

export const wishFormSchema = z.object({
  id: z.number().nullable(),
  title: z.string().min(1, 'Введите название'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Цена не может быть отрицательной').optional(),
  isVisible: z.boolean(),
  isFulfilled: z.boolean(),
  productUrl: z.string().url('Некорректная ссылка').optional(),
  imageUrl: z.string().url('Добавьте картинку').optional(),
});

export type WishForm = z.infer<typeof wishFormSchema>;

export const WISH_FORM_DEFAULT_VALUES: WishForm = {
  id: null,
  title: '',
  description: '',
  price: undefined,
  isVisible: true,
  isFulfilled: false,
  productUrl: '',
  imageUrl: '',
};
