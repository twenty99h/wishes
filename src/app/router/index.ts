import { PAGE_ROUTES } from '@/pages/routes';
import { createBrowserRouter, RouteObject } from 'react-router';
import App from '../App';

const ROUTES: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [...PAGE_ROUTES],
  },
];

export const router = createBrowserRouter(ROUTES);
