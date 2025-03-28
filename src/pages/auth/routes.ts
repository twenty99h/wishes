import { rootRoute } from '@/app/router';
import { createRoute } from '@tanstack/react-router';
import { AuthLayout } from './ui/auth-layout';

const route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthLayout,
});

const registerRoute = createRoute({
  getParentRoute: () => route,
  path: '/register',
}).lazy(() => import('./ui/register').then((d) => d.Route));

const loginRoute = createRoute({
  getParentRoute: () => route,
  path: '/login',
}).lazy(() => import('./ui/login').then((d) => d.Route));

export const authRoute = route.addChildren([registerRoute, loginRoute]);
