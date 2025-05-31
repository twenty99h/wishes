import { $user } from '@/entities/user';
import { usersApi } from '@/shared/api';
import { createMutation } from '@farfetched/core';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { or } from 'patronum';
import { PageGate } from './page';
import { $currentUser } from './user';

const followUserFx = createEffect(usersApi.followUser);
const unfollowUserFx = createEffect(usersApi.unfollowUser);

const followUserMutation = createMutation({
  effect: followUserFx,
});

const unfollowUserMutation = createMutation({
  effect: unfollowUserFx,
});

export const userFollowed = createEvent<string>();
export const userUnfollowed = createEvent<string>();

export const $isFollowed = createStore<boolean>(false).reset([PageGate.close]);

export const $isFollowPending = or(followUserMutation.$pending, unfollowUserMutation.$pending);

sample({
  clock: $currentUser,
  filter: Boolean,
  fn: (user) => Boolean(user.is_current_user_followed),
  target: $isFollowed,
});

sample({
  clock: userFollowed,
  source: $user,
  filter: Boolean,
  fn: (user, followedUserId) => ({ userId: user.id, followedUserId }),
  target: followUserMutation.start,
});

sample({
  clock: userUnfollowed,
  source: $user,
  filter: Boolean,
  fn: (user, followedUserId) => ({ userId: user.id, followedUserId }),
  target: unfollowUserMutation.start,
});

sample({
  clock: followUserMutation.finished.success,
  fn: () => true,
  target: $isFollowed,
});

sample({
  clock: unfollowUserMutation.finished.success,
  fn: () => false,
  target: $isFollowed,
});
