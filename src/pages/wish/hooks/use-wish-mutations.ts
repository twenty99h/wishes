import { wishesApi } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

export function useWishMutations() {
  const createWishMutation = useMutation({
    mutationFn: wishesApi.createWish,
  });

  const updateWishMutation = useMutation({
    mutationFn: wishesApi.updateWish,
  });

  const deleteWishMutation = useMutation({
    mutationFn: wishesApi.deleteWish,
  });

  return {
    createWish: createWishMutation,
    updateWish: updateWishMutation,
    deleteWish: deleteWishMutation,
  };
}
