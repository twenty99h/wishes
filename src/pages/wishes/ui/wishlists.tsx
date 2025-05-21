import { Wishlist } from '@/shared/types/wish';
import { Flex, Skeleton } from '@/shared/ui';
import { useParams } from 'react-router';
import { WishlistFormDialog } from './wishlist-form-dialog';
import { WishlistItem } from './wishlist-item';

type WishesTabsProps = {
  wishlists: Wishlist[];
  isPending?: boolean;
  error?: Error | null;
};

export function Wishlists({ wishlists, isPending, error }: WishesTabsProps) {
  const { wishlistId } = useParams();

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
        <WishlistItem key={wishlist.id} wishlist={wishlist} active={wishlist.id === Number(wishlistId)} />
      ))}
      <WishlistFormDialog />
    </Flex>
  );
}

function WishlistsSkeleton() {
  return (
    <Flex gap={2}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="rounded-3xl h-9 w-20" />
      ))}
      <Skeleton className="rounded-3xl h-9 w-10" />
    </Flex>
  );
}
