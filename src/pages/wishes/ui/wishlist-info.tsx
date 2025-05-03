import { Button, Flex, Skeleton, Text } from '@/shared/ui';
import { Pencil } from 'lucide-react';
import { useWishlistStore } from '../model';
import { Wishlist } from '@/shared/types/wish';

type WishlistInfoProps = {
  wishlist?: Wishlist;
  isPending?: boolean;
  error?: Error | null;
};

export default function WishlistInfo({ wishlist, isPending, error }: WishlistInfoProps) {
  const openEditingDialog = useWishlistStore((state) => state.openEditingDialog);

  if (isPending) {
    return <Skeleton className="w-full rounded-3xl h-78" />;
  }

  if (error || !wishlist) {
    return <div>Не удалось загрузить вишлист. Попробуйте обновить страницу.</div>;
  }

  function handleOpenEditingDialog() {
    if (!wishlist) {
      return;
    }
    openEditingDialog(wishlist);
  }

  return (
    <Flex align="center" gap={2}>
      <Text size="xl" weight="bold">
        {wishlist.title}
      </Text>
      <Button className="rounded-full" size="icon" variant="ghost" onClick={handleOpenEditingDialog}>
        <Pencil size="16" />
      </Button>
    </Flex>
  );
}
