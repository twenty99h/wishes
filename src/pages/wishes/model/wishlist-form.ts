import { wishlistsApi } from '@/shared/api';
import { showToast, ToastParams } from '@/shared/lib/model';
import { Wishlist } from '@/shared/types/wish';
import { createMutation } from '@farfetched/core';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { or } from 'patronum';
import { z } from 'zod';
import { $currentWishlist, wishlistsQuery } from './wishlist';

type FormMode = 'create' | 'edit';

export const wishlistFormSchema = z.object({
  id: z.number().nullable(),
  title: z.string().min(3, 'Минимум 3 символа'),
});

export type WishlistForm = z.infer<typeof wishlistFormSchema>;

export const WISHLIST_FORM_DEFAULT_VALUES: WishlistForm = {
  id: null,
  title: '',
};

const createWishlistFx = createEffect(wishlistsApi.createWishlist);
const updateWishlistFx = createEffect(wishlistsApi.updateWishlist);
const deleteWishlistFx = createEffect(wishlistsApi.deleteWishlist);

export const createWishlistMutation = createMutation({
  effect: createWishlistFx,
});

export const updateWishlistMutation = createMutation({
  effect: updateWishlistFx,
});

export const deleteWishlistMutation = createMutation({
  effect: deleteWishlistFx,
});

sample({
  clock: [
    createWishlistMutation.finished.success,
    updateWishlistMutation.finished.success,
    deleteWishlistMutation.finished.success,
  ],
  target: wishlistsQuery.refresh,
});

export const $isFormActionsPending = or(
  createWishlistMutation.$pending,
  updateWishlistMutation.$pending,
  deleteWishlistMutation.$pending
);

export const dialogOpened = createEvent<{ mode: FormMode }>();
export const dialogClosed = createEvent();

export const wishlistCreated = createEvent<{ title: Wishlist['title'] }>();
export const wishlistUpdated = createEvent<{ id: Wishlist['id']; title: Wishlist['title'] }>();
export const wishlistDeleted = createEvent<{ id: Wishlist['id'] }>();

export const $isDialogOpen = createStore<boolean>(false).reset(dialogClosed);

export const $formMode = createStore<FormMode>('create').reset(dialogClosed);
export const $formValues = createStore<WishlistForm | null>(null).reset(dialogClosed);
export const $isCanDelete = createStore<boolean>(false).reset(dialogClosed);

sample({
  clock: dialogOpened,
  fn: () => true,
  target: $isDialogOpen,
});

sample({
  clock: dialogOpened,
  fn: ({ mode }) => mode,
  target: $formMode,
});

const dialogOpenedForEdit = sample({
  clock: dialogOpened,
  source: $currentWishlist,
  filter: (wishlist, { mode }): wishlist is Wishlist => Boolean(wishlist) && mode === 'edit',
});

sample({
  clock: dialogOpenedForEdit,
  fn: ({ id, title }) => ({ id, title }),
  target: $formValues,
});

sample({
  clock: dialogOpenedForEdit,
  fn: ({ deletable }) => Boolean(deletable),
  target: $isCanDelete,
});

sample({
  clock: wishlistCreated,
  target: createWishlistMutation.start,
});

sample({
  clock: wishlistUpdated,
  target: updateWishlistMutation.start,
});

sample({
  clock: wishlistDeleted,
  fn: ({ id }) => id,
  target: deleteWishlistMutation.start,
});

sample({
  clock: [
    createWishlistMutation.finished.success,
    updateWishlistMutation.finished.success,
    deleteWishlistMutation.finished.success,
  ],
  target: dialogClosed,
});

sample({
  clock: [
    createWishlistMutation.finished.failure,
    updateWishlistMutation.finished.failure,
    deleteWishlistMutation.finished.failure,
  ],
  fn: ({ error }): ToastParams => ({
    message: error.message,
    options: {
      type: 'error',
    },
  }),
  target: showToast,
});
