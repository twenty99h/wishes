import { AUTH_ROUTES } from './auth';
import { WISH_ROUTES } from './wish/routes';
import { WISHES_ROUTES } from './wishes/routes';

export const PAGE_ROUTES = [...AUTH_ROUTES, ...WISHES_ROUTES, ...WISH_ROUTES];
