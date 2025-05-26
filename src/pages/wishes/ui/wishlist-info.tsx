import { Wishlist } from '@/shared/types/wish';
import { Button, Flex, NavButton, Skeleton, Text } from '@/shared/ui';
import { useUnit } from 'effector-react';
import { Pencil, Plus } from 'lucide-react';
import { dialogOpened } from '../model';

type WishlistInfoProps = {
  wishlist: Wishlist | null;
  isPending?: boolean;
};

export function WishlistInfo({ wishlist, isPending }: WishlistInfoProps) {
  const openDialog = useUnit(dialogOpened);

  if (isPending) {
    return <Skeleton className="w-full rounded-3xl h-10" />;
  }

  if (!wishlist) {
    return <div>Не удалось загрузить вишлист. Попробуйте обновить страницу.</div>;
  }

  function handleOpenEditingDialog() {
    if (!wishlist) {
      return;
    }
    openDialog({ mode: 'edit' });
  }

  return (
    <Flex align="center" gap={4}>
      <Flex className="w-auto" gap={2} align="center">
        <Text size="xl" weight="bold">
          {wishlist.title}
        </Text>
        <Button className="rounded-full" size="icon" variant="ghost" onClick={handleOpenEditingDialog}>
          <Pencil size="16" />
        </Button>
      </Flex>
      <NavButton to={`/wishes/${wishlist.id}/create`} className="rounded-full" variant="secondary">
        <Plus size="16" />
        <Text size="sm">Добавить желание</Text>
      </NavButton>
    </Flex>
  );
}
