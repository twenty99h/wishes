import { $user } from '@/entities/user';
import { usersApi } from '@/shared/api';
import { createMutation, createQuery } from '@farfetched/core';
import { combine, createEffect, sample } from 'effector';
import { $followingFilter, $search, searchDebounced } from './search';
import { PageGate } from './page';

const getAllUsersFx = createEffect(usersApi.getAllUsersWithSubscriptionStatus);
const getMySubscriptionsFx = createEffect(usersApi.getMyFollows);
const subscribeToUserFx = createEffect(usersApi.followUser);
const unsubscribeFromUserFx = createEffect(usersApi.unfollowUser);

export const usersQuery = createQuery({
  effect: getAllUsersFx,
});

export const followsQuery = createQuery({
  effect: getMySubscriptionsFx,
});

export const followUserMutation = createMutation({
  effect: subscribeToUserFx,
});

export const unfollowUserMutation = createMutation({
  effect: unsubscribeFromUserFx,
});

export const $isUsersPending = combine($user, usersQuery.$pending, (user, pending) => !user || pending);

sample({
  clock: [PageGate.open, searchDebounced, $followingFilter],
  source: { search: $search, filter: $followingFilter },
  fn: ({ search, filter }) => ({ search, filter }),
  target: usersQuery.start,
});
