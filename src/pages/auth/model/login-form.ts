import { $user } from '@/entities/user';
import { authApi } from '@/shared/api';
import { showToast, ToastParams } from '@/shared/lib/model';
import { navigate } from '@/shared/lib/router';
import { createMutation } from '@farfetched/core';
import { createEffect, createEvent, sample } from 'effector';
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Не менее 6 символов'),
});

export type LoginForm = z.infer<typeof loginFormSchema>;

const loginFx = createEffect(authApi.signIn);

const loginMutation = createMutation({
  effect: loginFx,
});

export const login = createEvent<LoginForm>();

export const $isLoginFormPending = loginMutation.$pending;

sample({
  clock: login,
  target: loginMutation.start,
});

sample({
  clock: loginMutation.finished.success,
  fn: ({ result }) => result,
  target: $user,
});

sample({
  clock: loginMutation.finished.success,
  fn: (): ToastParams => ({
    message: 'Вы успешно вошли!',
    options: {
      type: 'success',
    },
  }),
  target: showToast,
});

sample({
  clock: loginMutation.finished.success,
  fn: () => ({
    to: '/wishes',
  }),
  target: navigate,
});

sample({
  clock: loginMutation.finished.failure,
  fn: ({ error }): ToastParams => ({
    message: error.message,
    options: {
      type: 'error',
    },
  }),
  target: showToast,
});
