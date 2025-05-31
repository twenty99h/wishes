import { WishesList } from '@/features/wishes';
import { Wishlists } from '@/features/wishlists';
import { Flex, Text } from '@/shared/ui';
import { useUnit } from 'effector-react';
import { userWishesQuery, userWishlistsQuery } from '../model';
import { useParams } from 'react-router';

export function UserWishes() {
  const { userWishlistId } = useParams();

  const { data: userWishlists, pending: userWishlistsPending, error: userWishlistsError } = useUnit(userWishlistsQuery);

  const { data: wishes, pending: wishesPending, error: wishesError } = useUnit(userWishesQuery);

  return (
    <Flex direction="column" gap={6} width="max" className="pb-6">
      <Wishlists
        wishlistId={Number(userWishlistId)}
        wishlists={userWishlists?.wishlists || []}
        isPending={userWishlistsPending}
        error={userWishlistsError}
        empty={<Text>У пользователя пока нет вишлистов!</Text>}
      />
      <WishesList wishes={wishes || []} isPending={wishesPending} error={wishesError} />
    </Flex>
  );
}
