import { usersApi } from '@/shared/api';
import { createQuery } from '@farfetched/core';
import { createEffect, sample } from 'effector';
import { PageGate } from './page';

export const getUserFx = createEffect(usersApi.getUser);

export const userQuery = createQuery({
  effect: getUserFx,
});

export const $currentUser = userQuery.$data;

sample({
  clock: PageGate.open,
  filter: ({ userId }) => Boolean(userId),
  fn: ({ userId }) => userId!,
  target: userQuery.start,
});
