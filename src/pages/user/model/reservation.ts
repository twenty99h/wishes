import { wishesApi } from '@/shared/api';
import { Wish } from '@/shared/types/wish';
import { createMutation, update } from '@farfetched/core';
import { createEffect, createEvent, sample } from 'effector';
import { userWishQuery } from './user-wish';

const reserveWishFx = createEffect(wishesApi.reserveWish);
const unreserveWishFx = createEffect(wishesApi.unreserveWish);

const reserveWishMutation = createMutation({
  effect: reserveWishFx,
});

update(userWishQuery, {
  on: reserveWishMutation,
  by: {
    success: ({ query }) => {
      if (query && 'result' in query) {
        return {
          result: query.result,
          refetch: true,
        };
      }

      return {
        result: null,
        refetch: true,
      };
    },
  },
});

const unreserveWishMutation = createMutation({
  effect: unreserveWishFx,
});

update(userWishQuery, {
  on: unreserveWishMutation,
  by: {
    success: ({ query }) => {
      if (query && 'result' in query) {
        return {
          result: query.result,
          refetch: true,
        };
      }

      return {
        result: null,
        refetch: true,
      };
    },
  },
});

export const wishReserved = createEvent<Wish['id']>();
export const wishReservationCanceled = createEvent<Wish['id']>();

export const $isReserving = reserveWishMutation.$pending;
export const $isReservationCancelling = unreserveWishMutation.$pending;

sample({
  clock: wishReserved,
  target: reserveWishMutation.start,
});

sample({
  clock: wishReservationCanceled,
  target: unreserveWishMutation.start,
});
