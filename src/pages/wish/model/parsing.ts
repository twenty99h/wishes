import { createMutation } from '@farfetched/core';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { z } from 'zod';
import { PageGate } from './page';
import { $wish, WishForm } from './wish';

export const urlSchema = z.object({
  url: z.string().url('Некорректная ссылка'),
});

const validateFx = createEffect((url: string) => {
  const result = urlSchema.safeParse({ url });
  return result.success;
});

const parseFx = createEffect(async (url: string) => {
  const value: WishForm = {
    id: null,
    title: 'Фигурка Funko POP! Movies Despicable Me 4 Mega Minion Gus',
    description: '',
    price: 2267,
    status: 'available',
    product_url: url,
    image_url: 'https://basket-17.wbbasket.ru/vol2643/part264361/264361745/images/c246x328/1.webp',
  };

  await new Promise((resolve) => setTimeout(resolve, 500));

  return value;
});

const parseWishMutation = createMutation({
  handler: parseFx,
});

export const parsingUrlChanged = createEvent<string>();
export const urlValidationStarted = createEvent();
const urlParsingStarted = createEvent();
export const $parsingUrl = createStore<string>('').reset([PageGate.close]);
export const $isParsingUrlValid = createStore<boolean>(true).reset([PageGate.close]);
export const $isParsingPending = parseWishMutation.$pending;

sample({
  clock: parsingUrlChanged,
  target: $parsingUrl,
});

sample({
  clock: urlValidationStarted,
  source: $parsingUrl,
  target: validateFx,
});

sample({
  clock: validateFx.doneData,
  target: $isParsingUrlValid,
});

sample({
  clock: parsingUrlChanged,
  source: $isParsingUrlValid,
  fn: () => true,
  target: $isParsingUrlValid,
});

sample({
  clock: validateFx.doneData,
  filter: Boolean,
  target: urlParsingStarted,
});

sample({
  clock: urlParsingStarted,
  source: $parsingUrl,
  target: parseWishMutation.start,
});

sample({
  clock: parseWishMutation.finished.success,
  source: $wish,
  fn: (wish, { result }) => ({ ...wish, ...result }),
  target: $wish,
});
