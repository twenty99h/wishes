import { authRoute } from '@/pages/auth';
import { mainRoute } from '@/pages/main';
import { createRootRoute, createRouter } from '@tanstack/react-router';
import App from '../App';
import { wishesRoute } from '@/pages/wishes';

export const rootRoute = createRootRoute({
  component: App,
});

const routeTree = rootRoute.addChildren([mainRoute.addChildren([wishesRoute]), authRoute]);

export const router = createRouter({ routeTree, defaultPreload: 'intent' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
