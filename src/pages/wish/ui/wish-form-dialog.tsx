import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Flex } from '@/shared/ui';
import { Plus, X } from 'lucide-react';
import { useWishStore } from '../model';
import { WishForm } from './wish-form';

export function WishFormDialog() {
  const open = useWishStore((state) => state.isDialogOpen);
  const openDialog = useWishStore((state) => state.openDialog);
  const closeDialog = useWishStore((state) => state.closeDialog);
  const isEditing = useWishStore((state) => state.isEditing);

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
            <DialogTitle>{isEditing ? 'Редактировать желание' : 'Создать желание'}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={closeDialog}>
              <X size="16" />
            </Button>
          </Flex>
        </DialogHeader>
        <WishForm />
      </DialogContent>
    </Dialog>
  );
}
