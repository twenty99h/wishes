import { supabaseWishlistsApi } from '@/shared/api/supabase';
import { navigate } from '@/shared/lib/router';
import { Wishlist } from '@/shared/types/wish';
import { concurrency, createQuery } from '@farfetched/core';
import { createEffect, createStore, sample } from 'effector';
import { PageGate } from './page';

const getWishlistsFx = createEffect(supabaseWishlistsApi.getWishlists);

export const wishlistsQuery = createQuery({
  effect: getWishlistsFx,
});

concurrency(wishlistsQuery, { strategy: 'TAKE_LATEST' });

export const $currentWishlist = createStore<Wishlist | null>(null);
export const $currentWishlistId = $currentWishlist.map((wishlist) => wishlist?.id ?? null);

sample({
  clock: PageGate.open,
  target: wishlistsQuery.start,
});

sample({
  clock: wishlistsQuery.finished.success,
  source: PageGate.state,
  filter: ({ wishlistId }, { result }) => !wishlistId && result.wishlists.length > 0,
  fn: (_, { result }) => ({
    to: `/wishes/${result.wishlists[0].id}`,
  }),
  target: navigate,
});

sample({
  clock: wishlistsQuery.finished.success,
  source: PageGate.state,
  fn: ({ wishlistId }, { result }) => findCurrentWishlist(result.wishlists, wishlistId),
  target: $currentWishlist,
});

sample({
  clock: PageGate.state,
  source: { finished: wishlistsQuery.$finished, data: wishlistsQuery.$data },
  filter: ({ finished, data }) => finished && Boolean(data),
  fn: ({ data }, { wishlistId }) => findCurrentWishlist(data?.wishlists || [], wishlistId),
  target: $currentWishlist,
});

function findCurrentWishlist(wishlists: Wishlist[], wishlistId?: string) {
  if (!wishlistId) {
    return wishlists[0] ?? null;
  }
  return wishlists.find(({ id }) => id === Number(wishlistId)) ?? null;
}
