import { WishTab } from '@/shared/types/wish';
import { API } from './api';

export async function getWishlists() {
  const res = await API.get<WishTab[]>('/wishlist');
  return res.data;
}
