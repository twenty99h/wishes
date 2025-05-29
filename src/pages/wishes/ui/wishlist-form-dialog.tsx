import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Flex } from '@/shared/ui';
import { Plus, X } from 'lucide-react';
import { WishlistForm } from './wishlist-form';
import { useUnit } from 'effector-react';
import { $formMode, $isDialogOpen, dialogClosed, dialogOpened } from '../model';

export function WishlistFormDialog() {
  const [isDialogOpen, formMode, openDialog, closeDialog] = useUnit([
    $isDialogOpen,
    $formMode,
    dialogOpened,
    dialogClosed,
  ]);

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-3xl cursor-pointer"
          variant="secondary"
          onClick={() => openDialog({ mode: 'create' })}
        >
          <Plus />
          Новый список
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined} withClose={false}>
        <DialogHeader>
          <Flex justify="between" align="center">
            <DialogTitle>{formMode === 'edit' ? 'Редактировать вишлист' : 'Создать вишлист'}</DialogTitle>
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
