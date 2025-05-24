import { Wishlist, WishlistData } from '@/shared/types/wish';
import { supabase } from '@@/supabase';

const TABLE_NAME = 'wishlists';

export async function getWishlists(): Promise<{ wishlists: Wishlist[] }> {
  const { data, error } = await supabase.from(TABLE_NAME).select('*');

  if (error) throw error;
  return { wishlists: data };
}

export async function getWishlist(id: Wishlist['id']): Promise<Wishlist> {
  const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('id', id).maybeSingle();

  if (error) throw error;

  return data;
}

export async function createWishlist(data: WishlistData): Promise<Wishlist> {
  const { data: createdWishlist, error } = await supabase.from(TABLE_NAME).insert(data).select().single();

  if (error) throw error;

  return createdWishlist;
}

export async function updateWishlist({ id, title }: Pick<Wishlist, 'id' | 'title'>): Promise<Wishlist> {
  const { data: updatedWishlist, error: updateError } = await supabase
    .from(TABLE_NAME)
    .update({ title })
    .eq('id', id)
    .select()
    .single();

  if (updateError) throw updateError;

  return updatedWishlist;
}

export async function deleteWishlist(id: Wishlist['id']): Promise<Wishlist> {
  const { data, error } = await supabase.from(TABLE_NAME).delete().eq('id', id).select().single();

  if (error) throw error;

  return data;
}
