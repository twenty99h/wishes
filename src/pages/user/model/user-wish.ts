import { wishesApi } from '@/shared/api';
import { createQuery } from '@farfetched/core';
import { createEffect, sample } from 'effector';
import { createGate } from 'effector-react';

const getUserWishFx = createEffect(wishesApi.getWish);

export const userWishQuery = createQuery({
  effect: getUserWishFx,
});

export const UserWishPageGate = createGate<{ id?: string }>();

sample({
  clock: UserWishPageGate.state,
  filter: ({ id }) => Boolean(id),
  fn: ({ id }) => Number(id),
  target: userWishQuery.start,
});
