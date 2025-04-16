import { Wishlist } from '@/shared/types/wish';
import { Flex, Skeleton } from '@/shared/ui';
import { useParams } from 'react-router';
import { WishlistDialog } from './wishlist-dialog';
import { WishlistItem } from './wishlist-item';

type WishesTabsProps = {
  wishlists: Wishlist[];
  isPending?: boolean;
  error?: Error | null;
};

export function Wishlists({ wishlists, isPending, error }: WishesTabsProps) {
  const { tabId } = useParams();

  if (isPending) {
    return <WishlistsSkeleton />;
  }

  // TODO: Add toast for error and maybe retry with illustration
  if (error) {
    return <div>Wishlists Error: {error.message}</div>;
  }

  return (
    <Flex gap={2}>
      {wishlists.map((wishlist) => (
        <WishlistItem key={wishlist.id} wishlist={wishlist} active={wishlist.id === Number(tabId)} />
      ))}
      <WishlistDialog />
    </Flex>
  );
}

function WishlistsSkeleton() {
  return (
    <Flex gap={2}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="rounded-3xl h-9 w-24" />
      ))}
    </Flex>
  );
}
