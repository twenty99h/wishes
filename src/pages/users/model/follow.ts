import { $user } from '@/entities/user';
import { usersApi } from '@/shared/api';
import { createMutation, update } from '@farfetched/core';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { PageGate } from './page';
import { usersQuery } from './list';

const followUserFx = createEffect(usersApi.followUser);
const unfollowUserFx = createEffect(usersApi.unfollowUser);

const followUserMutation = createMutation({
  effect: followUserFx,
});

update(usersQuery, {
  on: followUserMutation,
  by: {
    success: ({ query }) => {
      if (query && 'result' in query) {
        return {
          result: query.result,
          refetch: true,
        };
      }

      return {
        result: [],
        refetch: true,
      };
    },
  },
});

const unfollowUserMutation = createMutation({
  effect: unfollowUserFx,
});

update(usersQuery, {
  on: unfollowUserMutation,
  by: {
    success: ({ query }) => {
      if (query && 'result' in query) {
        return {
          result: query.result,
          refetch: true,
        };
      }

      return {
        result: [],
        refetch: true,
      };
    },
  },
});

export const userFollowed = createEvent<string>();
export const userUnfollowed = createEvent<string>();

export const $pendingUsersMap = createStore<Record<string, boolean>>({}).reset(PageGate.close);

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
  clock: [followUserMutation.started, unfollowUserMutation.started],
  source: $pendingUsersMap,
  fn: (map, { params }) => ({ ...map, [params.followedUserId]: true }),
  target: $pendingUsersMap,
});

sample({
  clock: [followUserMutation.finished.success, unfollowUserMutation.finished.success],
  source: $pendingUsersMap,
  fn: (map, { params }) => ({ ...map, [params.followedUserId]: false }),
  target: $pendingUsersMap,
});
