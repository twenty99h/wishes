import { createEvent, createStore } from 'effector';
import { debounce } from 'patronum';

const DEBOUNCE_TIME = 500;

export const searchChanged = createEvent<string>();
export const $search = createStore('').on(searchChanged, (_, v) => v);
export const searchDebounced = debounce($search, DEBOUNCE_TIME);

export const followingFilterToggled = createEvent();
export const $followingFilter = createStore<'all' | 'following'>('all').on(followingFilterToggled, (state) =>
  state === 'all' ? 'following' : 'all'
);
