import { wishlistsApi } from '@/shared/api';
import { createQuery } from '@farfetched/core';
import { createEffect, sample } from 'effector';
import { debug } from 'patronum';
import { PageGate } from './page';

const getWishlistsFx = createEffect(wishlistsApi.getWishlists);

export const wishlistsQuery = createQuery({
  effect: getWishlistsFx,
});

sample({
  clock: PageGate.open,
  target: wishlistsQuery.start,
});

debug({
  wishlistsQuery: wishlistsQuery.start,
  pageGateState: PageGate.state,
});
