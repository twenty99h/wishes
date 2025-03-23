import { RouteObject } from 'react-router';
import { Login, Register } from './ui';

export const ROUTES: RouteObject[] = [
  {
    path: 'register',
    Component: Register,
  },
  {
    path: 'login',
    Component: Login,
  },
];
