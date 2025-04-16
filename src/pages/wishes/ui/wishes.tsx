import { Flex } from '@/shared/ui';
import { useNavigate, useParams } from 'react-router';

import { useWishes, useWishlists } from '../hooks';
import { WishesList } from './wishes-list';
import { WishesTabs } from './wishes-tabs';

export function WishesPage() {
  const { tabId } = useParams();
  const navigate = useNavigate();

  const { data: wishlists = [], isPending: isWishlistsPending, error: wishlistsError } = useWishlists();

  const shouldFetchWishes = !isWishlistsPending && !wishlistsError && Boolean(tabId);
  const {
    data: wishes = [],
    isPending: isWishesPending,
    error: wishesError,
  } = useWishes(Number(tabId), shouldFetchWishes);

  if (wishlists.length > 0 && !tabId) {
    const firstWishlist = wishlists[0];
    if (firstWishlist) {
      navigate(`/wishes/${firstWishlist.id}`);
    }
  }

  return (
    <Flex className="p-8" direction="column" gap={4}>
      <WishesTabs wishlists={wishlists} isPending={isWishlistsPending} error={wishlistsError} />
      <WishesList wishes={wishes} isPending={isWishesPending} error={wishesError} />
    </Flex>
  );
}
