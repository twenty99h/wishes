import { wishesApi, wishlistsApi } from '@/shared/api';
import { createQuery } from '@farfetched/core';
import { createEffect, sample } from 'effector';
import { PageGate } from './page';
import { $currentUser } from './user';

const getUserWishlistsFx = createEffect(wishlistsApi.getWishlists);
const getUserWishesFx = createEffect(wishesApi.getWishes);

export const userWishlistsQuery = createQuery({
  effect: getUserWishlistsFx,
});

export const userWishesQuery = createQuery({
  effect: getUserWishesFx,
});

sample({
  clock: $currentUser,
  filter: Boolean,
  fn: ({ id }) => ({ userId: id }),
  target: userWishlistsQuery.start,
});

sample({
  clock: PageGate.state,
  filter: ({ userId, userWishlistId }) => Boolean(userId) && Boolean(userWishlistId),
  fn: ({ userId, userWishlistId }) => ({ wishlistId: Number(userWishlistId), userId: userId! }),
  target: userWishesQuery.start,
});
