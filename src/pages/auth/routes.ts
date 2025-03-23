import { RouteObject } from 'react-router';
import { LoginPage, RegisterPage } from './ui';

export const ROUTES: RouteObject[] = [
  {
    path: 'register',
    Component: RegisterPage,
  },
  {
    path: 'login',
    Component: LoginPage,
  },
];
