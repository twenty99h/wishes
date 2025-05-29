import { RouteObject } from 'react-router';

export const USER_ROUTES: RouteObject[] = [
  {
    path: '/users/:userId',
    lazy: {
      Component: async () => (await import('./ui')).UserPage,
    },
  },
];
