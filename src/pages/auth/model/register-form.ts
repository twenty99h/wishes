import { $user } from '@/entities/user';
import { authApi } from '@/shared/api';
import { showToast, ToastParams } from '@/shared/lib/model';
import { navigate } from '@/shared/lib/router';
import { createMutation } from '@farfetched/core';
import { createEffect, createEvent, sample } from 'effector';
import { z } from 'zod';

export const registerFormSchema = z
  .object({
    username: z.string({ required_error: 'Обязательное поле' }).min(3, 'Не менее 3 символов'),
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Не менее 6 символов'),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Пароли не совпадают',
      });
    }
  });

export type RegisterForm = z.infer<typeof registerFormSchema>;

const registerFx = createEffect(authApi.signUp);

const registerMutation = createMutation({
  effect: registerFx,
});

export const register = createEvent<RegisterForm>();

export const $isRegisterFormPending = registerMutation.$pending;

sample({
  clock: register,
  target: registerMutation.start,
});

sample({
  clock: registerMutation.finished.success,
  fn: ({ result }) => result,
  target: $user,
});

sample({
  clock: registerMutation.finished.success,
  fn: (): ToastParams => ({
    message: 'Вы успешно зарегистрировались!',
    options: {
      type: 'success',
    },
  }),
  target: showToast,
});

sample({
  clock: registerMutation.finished.success,
  fn: () => ({
    to: '/wishes',
  }),
  target: navigate,
});

sample({
  clock: registerMutation.finished.failure,
  fn: ({ error }): ToastParams => ({
    message: error.message,
    options: {
      type: 'error',
    },
  }),
  target: showToast,
});
