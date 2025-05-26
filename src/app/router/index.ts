import { AUTH_PAGE_ROUTES, WISHES_PAGE_ROTES } from '@/pages/routes';
import { createBrowserRouter, RouteObject } from 'react-router';
import App from '../App';

const ROUTES: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [...WISHES_PAGE_ROTES],
  },
  ...AUTH_PAGE_ROUTES,
];

export const router = createBrowserRouter(ROUTES);
