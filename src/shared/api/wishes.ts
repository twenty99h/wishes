import { API } from './api';
import { Wish, Wishlist } from '@/shared/types/wish';

export async function getWishes(wishlistId: Wishlist['id']) {
  const res = await API.get<Wish[]>('/wishes', {
    params: { wishlistId },
  });
  return res.data;
}
