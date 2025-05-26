import { WISH_ROUTES } from './wish';
import { WISHES_ROUTES, WishesLayout } from './wishes';
import { AUTH_ROUTES } from './auth';

export const WISHES_PAGE_ROTES = [
  {
    path: '/wishes',
    Component: WishesLayout,
    children: [...WISHES_ROUTES, ...WISH_ROUTES],
  },
];

export const AUTH_PAGE_ROUTES = AUTH_ROUTES;
