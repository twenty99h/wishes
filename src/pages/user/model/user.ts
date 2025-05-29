import { createEffect, sample } from 'effector';
import { usersApi } from '@/shared/api';
import { PageGate } from './page';
import { createQuery } from '@farfetched/core';
import { debug } from 'patronum';

export const getUserFx = createEffect(usersApi.getUser);

export const userQuery = createQuery({
  effect: getUserFx,
});

sample({
  clock: PageGate.open,
  filter: ({ userId }) => Boolean(userId),
  fn: ({ userId }) => userId!,
  target: userQuery.start,
});

debug({
  gate: PageGate.open,
});
