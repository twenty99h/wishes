import { API } from './api';
import { Wish } from '@/shared/types/wish';

export async function getWishes(tabId: number) {
  const res = await API.get<Wish[]>('/wishes', {
    params: {
      wishlistId: tabId,
    },
  });
  return res.data;
}
