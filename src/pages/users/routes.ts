import { RouteObject } from 'react-router';

export const USERS_ROUTES: RouteObject[] = [
  {
    path: '/users',
    lazy: {
      Component: async () => (await import('./ui/users-page')).UsersPage,
    },
  },
];
