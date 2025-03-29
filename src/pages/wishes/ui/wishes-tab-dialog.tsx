import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger, Button } from '@/shared/ui';
import { Plus } from 'lucide-react';
import { WishesTabForm } from './wishes-tab-form';

export function WishesTabDialog() {
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
        <WishesTabForm />
      </DialogContent>
    </Dialog>
  );
}
