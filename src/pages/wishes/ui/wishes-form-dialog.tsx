import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { WishesForm } from './wishes-form';
import { Wish } from '@/shared/types/wish';
import { ReactNode, useState } from 'react';
import { Plus } from 'lucide-react';

type WishesFormDialogProps = {
  onSubmit: (data: Partial<Wish>) => void;
  trigger?: ReactNode;
};

// TODO: Пока что фигня сгенерированная иишкой

export function WishesFormDialog({ onSubmit, trigger }: WishesFormDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: Partial<Wish>) => {
    onSubmit(data);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="rounded-3xl cursor-pointer" variant="secondary">
            <Plus />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Wish</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new wish. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <WishesForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}
