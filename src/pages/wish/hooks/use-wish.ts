import { wishesApi } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

export function useWish(wishId: number) {
  return useQuery({
    queryKey: [wishId],
    queryFn: () => wishesApi.getWish(Number(wishId)),
    enabled: Boolean(wishId),
  });
}
