import { createBrowserRouter } from 'react-router';
import App from '../App';
import { ROUTES as AUTH_ROUTES } from '@/pages/auth';

export const ROUTER = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: '/auth',
    children: [...AUTH_ROUTES],
  },
]);
