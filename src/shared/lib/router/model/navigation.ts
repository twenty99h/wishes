import { createEffect, createEvent, sample } from 'effector';
import { NavigateFunction, NavigateOptions, To } from 'react-router';

let navigateFn: NavigateFunction;

const initNavigationFx = createEffect((fn: NavigateFunction) => {
  navigateFn = fn;
});

const navigateFx = createEffect(({ to, options }: { to: To; options?: NavigateOptions }) => {
  navigateFn?.(to, options);
});

export const initNavigation = createEvent<NavigateFunction>();

export const navigate = createEvent<{ to: To; options?: NavigateOptions }>();

sample({
  clock: initNavigation,
  target: initNavigationFx,
});

sample({
  clock: navigate,
  target: navigateFx,
});
