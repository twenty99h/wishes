import { mainRoute } from '@/pages/main';
import { createRoute } from '@tanstack/react-router';

const _wishesRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/wishes',
}).lazy(() => import('./ui/wishes').then((d) => d.Route));

export const wishesTabRoute = createRoute({
  getParentRoute: () => _wishesRoute,
  path: '/$tabId',
});

export const wishesRoute = _wishesRoute.addChildren([wishesTabRoute]);
