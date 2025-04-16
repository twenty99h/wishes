import { wishlistsApi } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

export function useWishlists() {
  return useQuery({
    queryKey: ['wishlists'],
    queryFn: wishlistsApi.getWishlists,
  });
}
