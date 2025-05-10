import { wishesApi } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

export function useWish() {
  const { wishlistId } = useParams();

  console.log(wishlistId);

  return useQuery({
    queryKey: ['wish', wishlistId],
    queryFn: () => wishesApi.getWish(Number(wishlistId)),
    enabled: !!wishlistId,
  });
}
