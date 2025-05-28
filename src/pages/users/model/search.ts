import { createEvent, createStore } from 'effector';
import { debounce } from 'patronum';

const DEBOUNCE_TIME = 500;

export const searchChanged = createEvent<string>();
export const $search = createStore('').on(searchChanged, (_, v) => v);
export const searchDebounced = debounce($search, DEBOUNCE_TIME);
