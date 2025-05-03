import { wishlistsApi } from '@/shared/api';
import { Wishlist } from '@/shared/types/wish';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useWishlistStore } from '../model';
import { useNavigate } from 'react-router';

const QUERY_KEY = 'wishlists';

export function useWishlists() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: wishlistsApi.getWishlists,
  });
}

export function useWishlist(id: Wishlist['id'], enabled: boolean = true) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => wishlistsApi.getWishlist(id),
    enabled: enabled && Boolean(id),
  });
}

export function useWishlistMutations() {
  const queryClient = useQueryClient();
  const closeDialog = useWishlistStore((state) => state.closeDialog);
  const navigate = useNavigate();

  const createWishlist = useMutation({
    mutationFn: wishlistsApi.createWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      closeDialog();
    },
  });

  const updateWishlist = useMutation({
    mutationFn: (wishlist: Wishlist) => wishlistsApi.updateWishlist(wishlist),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      closeDialog();
    },
  });

  const deleteWishlist = useMutation({
    mutationFn: wishlistsApi.deleteWishlist,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      closeDialog();
      console.log('data.nextId', data.nextId);
      navigate(`/wishes/${data.nextId}`);
    },
  });

  return {
    useWishlists,
    createWishlist,
    updateWishlist,
    deleteWishlist,
  };
}
