import { createLazyRoute } from '@tanstack/react-router';

export const Route = createLazyRoute('/wishes')({
  component: WishesPage,
});

function WishesPage() {
  return <div>WishesPage</div>;
}
