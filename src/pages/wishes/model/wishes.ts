import { wishesApi } from '@/shared/api';
import { createQuery } from '@farfetched/core';
import { createEffect, sample } from 'effector';
import { PageGate } from './page';

const getWishesFx = createEffect(wishesApi.getMyWishes);

export const wishesQuery = createQuery({
  effect: getWishesFx,
});

sample({
  clock: PageGate.open,
  fn: ({ wishlistId }) => ({ wishlistId: Number(wishlistId) }),
  target: wishesQuery.start,
});
