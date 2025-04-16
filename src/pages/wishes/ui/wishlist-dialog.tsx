import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger, Button } from '@/shared/ui';
import { Plus } from 'lucide-react';
import { WishlistForm } from './wishlist-form';

export function WishlistDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-3xl cursor-pointer" variant="secondary">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Создать вишлист</DialogTitle>
        </DialogHeader>
        <WishlistForm />
      </DialogContent>
    </Dialog>
  );
}
