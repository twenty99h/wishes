import { wishesApi } from '@/shared/api';
import { createQuery } from '@farfetched/core';
import { createEffect, sample } from 'effector';
import { PageGate } from './page';

const getWishesFx = createEffect(wishesApi.getWishes);

export const wishesQuery = createQuery({
  effect: getWishesFx,
});

sample({
  clock: PageGate.state,
  filter: ({ wishlistId }) => Boolean(wishlistId),
  fn: ({ wishlistId }) => Number(wishlistId),
  target: wishesQuery.start,
});
