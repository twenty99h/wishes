import { Wish, Wishlist } from '@/shared/types/wish';
import { supabase } from '@@/supabase';

const TABLE_NAME = 'wishes';
const STORAGE_BUCKET = 'images';

export async function getWishes(wishlistId: Wish['id']) {
  const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('wishlistId', wishlistId);

  if (error) throw error;
  return data;
}

export async function getWish(id: Wish['id']) {
  const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('id', id).single();

  if (error) throw error;
  return data;
}

export async function createWish(wish: Omit<Wish, 'id'> & { file?: File; wishlistId: Wishlist['id'] }) {
  const { file, ...wishData } = wish;

  const { data: newWish, error: createError } = await supabase
    .from(TABLE_NAME)
    .insert({ ...wishData })
    .select()
    .single();

  if (createError) throw createError;

  if (file) {
    try {
      const imageUrl = await uploadWishImage(file, newWish.id);
      const { data: updatedWish, error: updateError } = await supabase
        .from(TABLE_NAME)
        .update({ imageUrl })
        .eq('id', newWish.id)
        .select()
        .single();

      if (updateError) throw updateError;
      return updatedWish;
    } catch (error) {
      // If image upload fails, delete the created wish
      await deleteWish(newWish.id);
      throw error;
    }
  }

  return newWish;
}

export async function updateWish(wish: Wish & { file?: File }) {
  const { id, imageUrl, file, ...wishData } = wish;

  // If there's a new image, upload it and delete the old one
  if (file) {
    if (imageUrl) {
      await deleteWishImage(imageUrl);
    }

    // Upload new image
    const newImageUrl = await uploadWishImage(file, id);

    // Update wish with new image URL
    const { data: updatedWish, error: updateError } = await supabase
      .from(TABLE_NAME)
      .update({ ...wishData, imageUrl: newImageUrl })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;
    return updatedWish;
  }

  // If no new image, just update the wish data
  const { data: updatedWish, error } = await supabase.from(TABLE_NAME).update(wish).eq('id', id).select().single();

  if (error) throw error;
  return updatedWish;
}

export async function deleteWish(id: Wish['id'], imageUrl?: string) {
  // Delete image if exists
  if (imageUrl) {
    await deleteWishImage(imageUrl);
  }

  // Delete wish
  const { data, error } = await supabase.from(TABLE_NAME).delete().eq('id', id).select().single();

  if (error) throw error;
  return data;
}

async function uploadWishImage(file: File, wishId: number): Promise<string> {
  const fileName = `${wishId}-${Date.now()}.${file.name.split('.').pop()}`;

  const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKET).upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}

async function deleteWishImage(imageUrl: string) {
  const fileName = imageUrl.split('/').pop();
  if (!fileName) return;

  const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([fileName]);
  if (error) throw error;
}
