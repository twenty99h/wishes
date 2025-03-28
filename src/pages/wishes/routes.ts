import { Spinner } from '@/shared/ui/spinner';
import { createRoute } from '@tanstack/react-router';
import { mainRoute } from '@/pages/main';

export const wishesRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/wishes',
  pendingComponent: Spinner,
}).lazy(() => import('./ui/wishes').then((d) => d.Route));
