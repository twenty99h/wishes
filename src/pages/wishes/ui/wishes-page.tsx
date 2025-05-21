import { Flex } from '@/shared/ui';
import { useParams } from 'react-router';

import { useGate, useUnit } from 'effector-react';
import { PageGate, wishlistsQuery } from '../model';
import { Wishlists } from './wishlists';

export function WishesPage() {
  const { wishlistId } = useParams();
  console.log('WishesPage', wishlistId);
  // const navigate = useNavigate();
  useGate(PageGate, { wishlistId });

  const { data: wishlists, pending: isWishlistsPending, error: wishlistsError } = useUnit(wishlistsQuery);

  // const { data: wishlistsData, isPending: isWishlistsPending, error: wishlistsError } = useWishlists();

  // const isWishlistsSuccessFetched = !isWishlistsPending && !wishlistsError && Boolean(wishlistId);

  // const {
  //   data: wishlist,
  //   isPending: isWishlistPending,
  //   error: wishlistError,
  // } = useWishlist(Number(wishlistId), isWishlistsSuccessFetched);

  // const {
  //   data: wishes = [],
  //   isPending: isWishesPending,
  //   error: wishesError,
  // } = useWishes(Number(wishlistId), isWishlistsSuccessFetched);

  return (
    <Flex className="p-8" direction="column" gap={6}>
      <Wishlists wishlists={wishlists?.wishlists || []} isPending={isWishlistsPending} error={wishlistsError} />
      {/* <Wishlists wishlists={wishlistsData?.wishlists || []} isPending={isWishlistsPending} error={wishlistsError} />
      <WishlistInfo wishlist={wishlist} isPending={isWishlistPending} error={wishlistError} />
      <WishesList wishes={wishes} isPending={isWishesPending} error={wishesError} /> */}
    </Flex>
  );
}
