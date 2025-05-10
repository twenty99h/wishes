import { MainPage } from '@/pages/main';
import { PAGE_ROUTES } from '@/pages/routes';
import { createBrowserRouter, RouteObject } from 'react-router';

const ROUTES: RouteObject[] = [
  {
    path: '/',
    Component: MainPage,
    children: [...PAGE_ROUTES],
  },
];

export const router = createBrowserRouter(ROUTES);
