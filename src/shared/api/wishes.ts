import { Wish } from '@/shared/types/wish';
import { API } from './api';

export async function getWishes(wishlistId: Wish['id']) {
  const res = await API.get<Wish[]>(`/wishes`, { params: { wishlistId } });
  return res.data;
}

export async function getWish(id: Wish['id']) {
  const res = await API.get<Wish>(`/wishes/${id}`);
  return res.data;
}

export async function createWish(data: Omit<Wish, 'id'>) {
  const res = await API.post<Wish>('/wishes', data);
  return res.data;
}

export async function updateWish({ id, ...data }: Wish) {
  const res = await API.put<Wish>(`/wishes/${id}`, data);
  return res.data;
}

export async function deleteWish(id: Wish['id']) {
  const res = await API.delete<{ id: number }>(`/wishes/${id}`);
  return res.data;
}
