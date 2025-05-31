import { RouteObject } from 'react-router';

export const USER_ROUTES: RouteObject[] = [
  {
    path: '/users/:userId',
    lazy: {
      Component: async () => (await import('./ui')).UserPage,
    },
    children: [
      {
        index: true,
        lazy: {
          Component: async () => (await import('./ui/user-wishes')).UserWishes,
        },
      },
      {
        path: ':userWishlistId',
        lazy: {
          Component: async () => (await import('./ui/user-wishes')).UserWishes,
        },
      },
      {
        path: ':userWishlistId/:userWishId',
        lazy: {
          Component: async () => (await import('./ui/user-wish')).UserWish,
        },
      },
    ],
  },
];
