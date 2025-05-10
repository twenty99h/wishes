import { Button, Flex, Skeleton, Text } from '@/shared/ui';
import { Pencil } from 'lucide-react';
import { useWish } from '../hooks/use-wish';
import { useWishStore } from '../model';
import { WishFormDialog } from './wish-form-dialog';

export function WishPage() {
  const openEditingDialog = useWishStore((state) => state.openEditingDialog);

  const { data: wish, isPending, error } = useWish();

  if (isPending) {
    return <Skeleton className="w-full rounded-3xl h-78" />;
  }

  if (error || !wish) {
    return <div>Не удалось загрузить желание. Попробуйте обновить страницу.</div>;
  }

  function handleOpenEditingDialog() {
    if (!wish) {
      return;
    }
    openEditingDialog(wish);
  }

  return (
    <div className="space-y-6">
      <Flex align="center" gap={2}>
        <Text size="xl" weight="bold">
          {wish.title}
        </Text>
        <Button className="rounded-full" size="icon" variant="ghost" onClick={handleOpenEditingDialog}>
          <Pencil size="16" />
        </Button>
      </Flex>

      {wish.description && <Text className="text-muted-foreground">{wish.description}</Text>}

      {wish.price && (
        <Text>
          Цена: {wish.price.amount} {wish.price.currency}
        </Text>
      )}

      {wish.productUrl && (
        <Text>
          <a href={wish.productUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Ссылка на товар
          </a>
        </Text>
      )}

      {wish.imageUrl && <img src={wish.imageUrl} alt={wish.title} className="rounded-lg max-w-full h-auto" />}

      <WishFormDialog />
    </div>
  );
}
