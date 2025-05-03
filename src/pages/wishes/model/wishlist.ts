import { Wishlist } from '@/shared/types/wish';
import { z } from 'zod';
import { create } from 'zustand';

export const wishlistFormSchema = z.object({
  id: z.number().nullable(),
  title: z.string().min(3, 'Минимум 3 символа'),
});

export type WishlistForm = z.infer<typeof wishlistFormSchema>;

type WishlistState = {
  formValues: WishlistForm | null;
  isDialogOpen: boolean;
  isEditing: boolean;
  isDeletable: boolean;
  openEditingDialog: (formValues: Wishlist) => void;
  openDialog: () => void;
  closeDialog: () => void;
};

export const WISHLIST_FORM_DEFAULT_VALUES: WishlistForm = {
  id: null,
  title: '',
};

export const useWishlistStore = create<WishlistState>((set) => ({
  formValues: null,
  isDialogOpen: false,
  isEditing: false,
  isDeletable: false,
  openEditingDialog: (wishlist) =>
    set(() => ({
      isDialogOpen: true,
      isEditing: true,
      formValues: {
        id: wishlist.id,
        title: wishlist.title,
      },
      isDeletable: Boolean(wishlist.deletable),
    })),
  openDialog: () => set(() => ({ isDialogOpen: true, isEditing: false, formValues: null })),
  closeDialog: () => set(() => ({ isDialogOpen: false })),
}));
