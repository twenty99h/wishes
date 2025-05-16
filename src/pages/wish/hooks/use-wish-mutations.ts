import { wishesApi } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWishStore } from '../model';

const QUERY_KEY = 'wishes';

export function useWishMutations() {
  const queryClient = useQueryClient();
  const closeDialog = useWishStore((state) => state.closeDialog);

  const createWishMutation = useMutation({
    mutationFn: wishesApi.createWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      closeDialog();
    },
  });

  const updateWishMutation = useMutation({
    mutationFn: wishesApi.updateWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      closeDialog();
    },
  });

  const deleteWishMutation = useMutation({
    mutationFn: wishesApi.deleteWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      closeDialog();
    },
  });

  return {
    createWish: createWishMutation,
    updateWish: updateWishMutation,
    deleteWish: deleteWishMutation,
  };
}
