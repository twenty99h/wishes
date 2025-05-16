import { RouteObject } from 'react-router';

export const WISH_ROUTES: RouteObject[] = [
  {
    path: '/wishes/:wishlistId/:wishId',
    lazy: {
      Component: async () => (await import('./ui/wish-page')).WishPage,
    },
  },
  {
    path: '/wishes/:wishlistId/create',
    lazy: {
      Component: async () => (await import('./ui/wish-page')).WishPage,
    },
  },
];
