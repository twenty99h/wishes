import { Wishlist, WishlistData } from '@/shared/types/wish';
import { API } from './api';

export async function getWishlists() {
  const res = await API.get<{ wishlists: Wishlist[] }>('/wishlist');
  return res.data;
}

export async function getWishlist(id: Wishlist['id']) {
  const res = await API.get<Wishlist>(`/wishlist/${id}`);
  return res.data;
}

export async function createWishlist(data: WishlistData) {
  const res = await API.post<Wishlist>('/wishlist', data);
  return res.data;
}

export async function updateWishlist({ id, title }: Wishlist) {
  const res = await API.put<Wishlist>(`/wishlist/${id}`, { title });
  return res.data;
}

export async function deleteWishlist(id: Wishlist['id']) {
  const res = await API.delete<{ id: number; nextId: number }>(`/wishlist/${id}`);
  return res.data;
}
