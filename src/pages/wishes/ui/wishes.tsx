import { Flex } from '@/shared/ui';
import { useNavigate, useParams } from 'react-router';

import { useWishes, useWishlist, useWishlists } from '../hooks';
import { WishesList } from './wishes-list';
import WishlistInfo from './wishlist-info';
import { Wishlists } from './wishlists';
import { useEffect } from 'react';

export function WishesPage() {
  const { wishlistId } = useParams();
  const navigate = useNavigate();

  const { data: wishlistsData, isPending: isWishlistsPending, error: wishlistsError } = useWishlists();

  useEffect(() => {
    // TODO: Пофиксить бог с запросом за удаленным вишлистом
    if (wishlistsData?.wishlistId !== wishlistId && !wishlistId) {
      console.log('navigate');
      navigate(`/wishes/${wishlistId || wishlistsData?.wishlistId}`);
    }
  }, [wishlistsData, wishlistId, navigate]);

  const isWishlistsSuccessFetched = !isWishlistsPending && !wishlistsError && Boolean(wishlistId);

  const {
    data: wishlist,
    isPending: isWishlistPending,
    error: wishlistError,
  } = useWishlist(Number(wishlistId), isWishlistsSuccessFetched);

  const {
    data: wishes = [],
    isPending: isWishesPending,
    error: wishesError,
  } = useWishes(Number(wishlistId), isWishlistsSuccessFetched);

  return (
    <Flex className="p-8" direction="column" gap={6}>
      <Wishlists wishlists={wishlistsData?.wishlists || []} isPending={isWishlistsPending} error={wishlistsError} />
      <WishlistInfo wishlist={wishlist} isPending={isWishlistPending} error={wishlistError} />
      <WishesList wishes={wishes} isPending={isWishesPending} error={wishesError} />
    </Flex>
  );
}
