import { wishesApi } from '@/shared/api';
import { Wish, Wishlist } from '@/shared/types/wish';
import { createMutation, createQuery } from '@farfetched/core';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { z } from 'zod';
import { PageGate } from './page';
import { or } from 'patronum';
import { $user } from '@/entities/user';

export const wishFormSchema = z.object({
  id: z.number().nullable(),
  title: z.string().min(1, 'Введите название'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Цена не может быть отрицательной').optional(),
  status: z.enum(['available', 'reserved', 'purchased']),
  product_url: z
    .string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, { message: 'Некорректная ссылка' }),
  image_url: z.string().optional(),
  file: z.any().optional(),
  wishlist_id: z.number().optional(),
});

export type WishForm = z.infer<typeof wishFormSchema>;

export const WISH_FORM_DEFAULT_VALUES: WishForm = {
  id: null,
  title: '',
  description: '',
  price: undefined,
  product_url: '',
  image_url: '',
  status: 'available',
};

const getWishFx = createEffect(wishesApi.getWish);
const createWishFx = createEffect(wishesApi.createWish);
const updateWishFx = createEffect(wishesApi.updateWish);

export const getWishQuery = createQuery({
  effect: getWishFx,
});

const createWishMutation = createMutation({
  effect: createWishFx,
});

const updateWishMutation = createMutation({
  effect: updateWishFx,
});

export const wishCreated = createEvent<Omit<WishForm, 'id'> & { file?: File; wishlist_id: Wishlist['id'] }>();
export const wishUpdated = createEvent<WishForm & { file?: File }>();

export const $isFormPending = or(createWishMutation.$pending, updateWishMutation.$pending);
export const $isWishPending = getWishQuery.$pending;
export const $wishError = getWishQuery.$error;

export const $wish = createStore<Wish | null>(null).reset(PageGate.close);

sample({
  clock: PageGate.open,
  filter: ({ wishId }) => Boolean(wishId),
  fn: ({ wishId }) => Number(wishId),
  target: getWishQuery.start,
});

sample({
  clock: wishCreated,
  source: $user,
  filter: Boolean,
  fn: (user, wish) => ({ ...wish, user_id: user.id }),
  target: createWishMutation.start,
});

sample({
  clock: wishUpdated,
  filter: (wish): wish is Wish & { file?: File } => Boolean(wish.wishlist_id),
  target: updateWishMutation.start,
});

sample({
  clock: wishUpdated,
  source: $wish,
  filter: Boolean,
  fn: (currentWish, updatedWish) => ({
    ...currentWish,
    title: updatedWish.title,
  }),
  target: $wish,
});

sample({
  clock: getWishQuery.finished.success,
  fn: ({ result }) => result,
  target: $wish,
});
