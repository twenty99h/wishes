import { RouteObject } from 'react-router';

export const AUTH_ROUTES: RouteObject[] = [
  {
    path: '/auth',
    lazy: {
      Component: async () => (await import('./ui/auth-layout')).AuthLayout,
    },
    children: [
      {
        path: 'register',
        lazy: {
          Component: async () => (await import('./ui/register')).RegisterPage,
        },
      },
      {
        path: 'login',
        lazy: {
          Component: async () => (await import('./ui/login')).LoginPage,
        },
      },
    ],
  },
];
