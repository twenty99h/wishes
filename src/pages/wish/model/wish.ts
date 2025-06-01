import { $user } from '@/entities/user';
import { wishesApi } from '@/shared/api';
import { showToast, ToastParams } from '@/shared/lib/model';
import { navigate } from '@/shared/lib/router';
import { Wish, Wishlist } from '@/shared/types/wish';
import { createMutation, createQuery } from '@farfetched/core';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { or } from 'patronum';
import { z } from 'zod';
import { PageGate } from './page';

export const wishFormSchema = z.object({
  id: z.number().nullable(),
  title: z.string().min(1, 'Введите название'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Цена не может быть отрицательной').optional(),
  status: z.enum(['available', 'purchased', 'reserved']),
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
const deleteWishFx = createEffect(wishesApi.deleteWish);

export const getWishQuery = createQuery({
  effect: getWishFx,
});

const createWishMutation = createMutation({
  effect: createWishFx,
});

const updateWishMutation = createMutation({
  effect: updateWishFx,
});

const deleteWishMutation = createMutation({
  effect: deleteWishFx,
});

export const wishCreated = createEvent<Omit<WishForm, 'id'> & { file?: File; wishlist_id: Wishlist['id'] }>();
export const wishUpdated = createEvent<WishForm & { file?: File }>();
export const wishDeleted = createEvent<WishForm['id']>();

export const $isFormPending = or(createWishMutation.$pending, updateWishMutation.$pending, deleteWishMutation.$pending);
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
  source: $wish,
  filter: Boolean,
  fn: (currentWish, updatedWish) => ({
    ...currentWish,
    ...updatedWish,
  }),
  target: updateWishMutation.start,
});

sample({
  clock: wishUpdated,
  source: $wish,
  filter: Boolean,
  fn: (currentWish, updatedWish) => ({
    ...currentWish,
    ...updatedWish,
  }),
  target: $wish,
});

sample({
  clock: wishDeleted,
  target: deleteWishMutation.start,
});

sample({
  clock: [
    createWishMutation.finished.success,
    updateWishMutation.finished.success,
    deleteWishMutation.finished.success,
  ],
  fn: () => ({
    to: '/wishes',
  }),
  target: navigate,
});

sample({
  clock: createWishMutation.finished.success,
  fn: (): ToastParams => ({
    message: 'Виш успешно создан!',
    options: {
      type: 'success',
    },
  }),
  target: showToast,
});

sample({
  clock: updateWishMutation.finished.success,
  fn: (): ToastParams => ({
    message: 'Виш успешно обновлен!',
    options: {
      type: 'success',
    },
  }),
  target: showToast,
});

sample({
  clock: deleteWishMutation.finished.success,
  fn: (): ToastParams => ({
    message: 'Виш успешно удален!',
    options: {
      type: 'success',
    },
  }),
  target: showToast,
});

sample({
  clock: getWishQuery.finished.success,
  fn: ({ result }) => result,
  target: $wish,
});
