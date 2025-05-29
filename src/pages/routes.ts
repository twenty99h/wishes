import { WISH_ROUTES } from './wish';
import { WISHES_ROUTES, WishesLayout } from './wishes';
import { AUTH_ROUTES } from './auth';
import { USERS_ROUTES } from './users';
import { USER_ROUTES } from './user';

export const WISHES_PAGE_ROTES = [
  {
    path: '/wishes',
    Component: WishesLayout,
    children: [...WISHES_ROUTES, ...WISH_ROUTES],
  },
];

export const AUTH_PAGE_ROUTES = AUTH_ROUTES;

export const USERS_PAGE_ROUTES = [...USERS_ROUTES, ...USER_ROUTES];
