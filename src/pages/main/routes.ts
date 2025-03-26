import { rootRoute } from '@/app/router';
import { Spinner } from '@/shared/ui/spinner';
import { createRoute } from '@tanstack/react-router';

export const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  pendingComponent: Spinner,
}).lazy(() => import('./main.lazy').then((d) => d.Route));
