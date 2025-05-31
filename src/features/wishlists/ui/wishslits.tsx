import { Wishlist } from '@/shared/types/wish';
import { Flex, Skeleton } from '@/shared/ui';
import { WishlistCard } from './wishlist-card';
import { ReactNode } from 'react';

type WishesTabsProps = {
  wishlistId: number;
  wishlists: Wishlist[];
  isPending?: boolean;
  error?: Error | null;
  empty?: ReactNode | null;
};

export function Wishlists({ wishlistId, wishlists, isPending, error, empty = null }: WishesTabsProps) {
  if (isPending) {
    return <WishlistsSkeleton />;
  }

  if (error) {
    return <div>Wishlists Error: {error.message}</div>;
  }

  if (wishlists.length == 0) return empty;

  return (
    <Flex gap={2} align="center" width="max">
      {wishlists.map((wishlist) => (
        <WishlistCard key={wishlist.id} wishlist={wishlist} active={wishlist.id === wishlistId} />
      ))}
      {/* <WishlistFormDialog /> */}
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
