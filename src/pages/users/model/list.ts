import { $user } from '@/entities/user';
import { usersApi } from '@/shared/api';
import { createMutation, createQuery } from '@farfetched/core';
import { combine, createEffect, sample } from 'effector';
import { debug } from 'patronum';
import { $search, searchDebounced } from './search';

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
  clock: [searchDebounced, $user],
  source: { user: $user, search: $search },
  filter: ({ user }) => Boolean(user),
  fn: ({ user, search }) => ({ userId: user!.id, search }),
  target: usersQuery.start,
});

debug({
  usersQuery: usersQuery.$status,
  user: $user,
});
