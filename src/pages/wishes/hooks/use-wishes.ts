import { wishesApi } from '@/shared/api';
import { Wishlist } from '@/shared/types/wish';
import { useQuery } from '@tanstack/react-query';

export function useWishes(wishlistId: Wishlist['id'], enabled: boolean = true) {
  return useQuery({
    queryKey: ['wishes', wishlistId],
    queryFn: () => wishesApi.getWishes(wishlistId),
    enabled: enabled && !!wishlistId,
  });
}
