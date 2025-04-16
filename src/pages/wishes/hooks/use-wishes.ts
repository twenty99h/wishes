import { wishesApi } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

export function useWishes(tabId: number, enabled: boolean = true) {
  return useQuery({
    queryKey: [tabId],
    queryFn: ({ queryKey }) => wishesApi.getWishes(queryKey[0]),
    enabled: enabled && !!tabId,
  });
}
