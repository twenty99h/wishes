import { rootRoute } from '@/app/router';
import { createRoute } from '@tanstack/react-router';

export const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
}).lazy(() => import('./main').then((d) => d.Route));
