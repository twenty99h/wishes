import { createRoute } from '@tanstack/react-router';
import { AuthLayout } from './ui/auth-layout';
import { rootRoute } from '@/app/router';
import { Spinner } from '@/shared/ui/spinner';

const route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthLayout,
});

const registerRoute = createRoute({
  getParentRoute: () => route,
  path: '/register',
  pendingComponent: Spinner,
}).lazy(() => import('./ui/register.lazy').then((d) => d.Route));

const loginRoute = createRoute({
  getParentRoute: () => route,
  path: '/login',
  pendingComponent: Spinner,
}).lazy(() => import('./ui/login.lazy').then((d) => d.Route));

export const authRoute = route.addChildren([registerRoute, loginRoute]);
