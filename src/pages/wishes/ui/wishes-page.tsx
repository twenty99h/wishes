import { Flex } from '@/shared/ui';
import { useParams } from 'react-router';

import { useGate, useUnit } from 'effector-react';
import { PageGate, wishlistsQuery, $currentWishlist, wishesQuery } from '../model';
import { Wishlists } from './wishlists';
import { WishlistInfo } from './wishlist-info';
import { WishesList } from './wishes-list';

export function WishesPage() {
  const { wishlistId } = useParams();

  useGate(PageGate, { wishlistId });

  const { data: wishlists, pending: isWishlistsPending, error: wishlistsError } = useUnit(wishlistsQuery);

  const currentWishlist = useUnit($currentWishlist);

  const { data: wishes, pending: isWishesPending, error: wishesError } = useUnit(wishesQuery);

  return (
    <Flex className="p-8" direction="column" gap={6}>
      <Wishlists wishlists={wishlists?.wishlists || []} isPending={isWishlistsPending} error={wishlistsError} />
      <WishlistInfo wishlist={currentWishlist} isPending={isWishlistsPending} />
      <WishesList wishes={wishes || []} isPending={isWishlistsPending || isWishesPending} error={wishesError} />
    </Flex>
  );
}
