import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Flex } from '@/shared/ui';
import { Plus, X } from 'lucide-react';
import { useWishlistStore } from '../model';
import { WishlistForm } from './wishlist-form';

export function WishlistFormDialog() {
  const open = useWishlistStore((state) => state.isDialogOpen);
  const openDialog = useWishlistStore((state) => state.openDialog);
  const closeDialog = useWishlistStore((state) => state.closeDialog);
  const isEditing = useWishlistStore((state) => state.isEditing);

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button className="rounded-3xl cursor-pointer" variant="secondary" onClick={openDialog}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined} withClose={false}>
        <DialogHeader>
          <Flex justify="between" align="center">
            <DialogTitle>{isEditing ? 'Редактировать вишлист' : 'Создать вишлист'}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={closeDialog}>
              <X size="16" />
            </Button>
          </Flex>
        </DialogHeader>
        <WishlistForm />
      </DialogContent>
    </Dialog>
  );
}
