import { authApi } from '@/shared/api';
import { showToast, ToastParams } from '@/shared/lib/model';
import { navigate } from '@/shared/lib/router';
import { AuthUser } from '@/shared/types/auth';
import { createMutation, createQuery } from '@farfetched/core';
import { combine, createEffect, createEvent, createStore, sample } from 'effector';

const getCurrentUserFx = createEffect(authApi.getCurrentUser);

const getCurrentUserQuery = createQuery({
  effect: getCurrentUserFx,
});

const logoutFx = createEffect(authApi.signOut);

const logoutMutation = createMutation({
  effect: logoutFx,
});

export const initUser = createEvent();
export const logout = createEvent();

export const $user = createStore<AuthUser | null>(null);
export const $userData = $user.map((user) => user?.user_metadata ?? null);
export const $isUserPending = getCurrentUserQuery.$pending;
export const $isUserLoggedIn = combine($user, $isUserPending, (user, pending) => user !== null || pending);

sample({
  clock: initUser,
  target: getCurrentUserQuery.start,
});

sample({
  clock: getCurrentUserQuery.finished.success,
  fn: ({ result }) => result,
  target: $user,
});

sample({
  clock: getCurrentUserQuery.finished.failure,
  fn: ({ error }): ToastParams => ({
    message: error.message,
    options: {
      type: 'error',
    },
  }),
  target: showToast,
});

sample({
  clock: logout,
  target: logoutMutation.start,
});

sample({
  clock: logoutMutation.finished.success,
  fn: () => null,
  target: $user,
});

sample({
  clock: logoutMutation.finished.success,
  fn: () => ({
    to: '/auth/login',
  }),
  target: navigate,
});
