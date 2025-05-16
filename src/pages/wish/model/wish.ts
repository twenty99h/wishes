import { Wish } from '@/shared/types/wish';
import { z } from 'zod';
import { create } from 'zustand';

type WishState = {
  formValues: WishForm | null;
  isDialogOpen: boolean;
  isEditing: boolean;
  openEditingDialog: (wish: Wish) => void;
  openDialog: () => void;
  closeDialog: () => void;
};

export const wishFormSchema = z.object({
  id: z.number().nullable(),
  title: z.string().min(3, 'Минимум 3 символа'),
  description: z.string().optional(),
  price: z
    .object({
      amount: z.number().min(0, 'Цена не может быть отрицательной'),
      currency: z.string().min(1, 'Выберите валюту'),
    })
    .optional(),
  isVisible: z.boolean(),
  isFulfilled: z.boolean(),
  productUrl: z.string().url('Некорректный URL').optional(),
  imageUrl: z.string().url('Некорректный URL').optional(),
});

export type WishForm = z.infer<typeof wishFormSchema>;

export const WISH_FORM_DEFAULT_VALUES: WishForm = {
  id: null,
  title: '',
  description: '',
  price: undefined,
  isVisible: true,
  isFulfilled: false,
  productUrl: '',
  imageUrl: '',
};

export const useWishStore = create<WishState>((set) => ({
  formValues: null,
  isDialogOpen: false,
  isEditing: false,
  openEditingDialog: (wish) =>
    set(() => ({
      isDialogOpen: true,
      isEditing: true,
      formValues: {
        id: wish.id,
        title: wish.title,
        description: wish.description,
        price: wish.price,
        isVisible: wish.isVisible,
        isFulfilled: wish.isFulfilled,
        productUrl: wish.productUrl,
        imageUrl: wish.imageUrl,
      },
    })),
  openDialog: () => set(() => ({ isDialogOpen: true, isEditing: false, formValues: WISH_FORM_DEFAULT_VALUES })),
  closeDialog: () => set(() => ({ isDialogOpen: false })),
}));
