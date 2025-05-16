import { RouteObject } from 'react-router';

export const WISHES_ROUTES: RouteObject[] = [
  {
    path: '/wishes',
    lazy: {
      Component: async () => (await import('./ui/wishes-page')).WishesPage,
    },
  },
  {
    path: '/wishes/:wishlistId',
    lazy: {
      Component: async () => (await import('./ui/wishes-page')).WishesPage,
    },
  },
];
