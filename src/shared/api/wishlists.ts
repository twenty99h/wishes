import type { Wishlist, WishlistData } from '@/shared/types/wish';
import type { AuthUser } from '@/shared/types/auth';
import { supabase } from '@@/supabase';

const TABLE_NAME = 'wishlists';

export async function getWishlists({ userId }: { userId?: AuthUser['id'] }): Promise<{ wishlists: Wishlist[] }> {
  let query = supabase.from(TABLE_NAME).select('*');

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) throw error;

  return { wishlists: data };
}

export async function getMyWishlists(): Promise<{ wishlists: Wishlist[] }> {
  const { data, error } = await supabase.rpc('get_my_wishlists');

  if (error) throw error;

  return { wishlists: data };
}

export async function getWishlist(id: Wishlist['id']): Promise<Wishlist> {
  const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('id', id).maybeSingle();

  if (error) throw error;

  return data;
}

export async function createWishlist(data: WishlistData): Promise<Wishlist> {
  const { data: createdWishlist, error } = await supabase.rpc('add_wishlist', {
    wishlist_data: { title: data.title, description: '' },
  });

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
  const { data, error } = await supabase.rpc('delete_wishlist', {
    p_wishlist_id: id,
  });

  if (error) throw error;

  return data;
}
