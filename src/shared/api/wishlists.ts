import { Wishlist } from '@/shared/types/wish';
import { API } from './api';

export async function getWishlists() {
  const res = await API.get<Wishlist[]>('/wishlist');
  return res.data;
}
