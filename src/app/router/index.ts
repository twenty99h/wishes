import { AUTH_ROUTES } from '@/pages/auth';
import { MainPage } from '@/pages/main';
import { WISHES_ROUTES } from '@/pages/wishes';
import { createBrowserRouter, RouteObject } from 'react-router';

const ROUTES: RouteObject[] = [
  {
    path: '/',
    Component: MainPage,
    children: [...AUTH_ROUTES, ...WISHES_ROUTES],
  },
];

export const router = createBrowserRouter(ROUTES);
