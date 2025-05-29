import { Button, Flex, Skeleton, Text } from '@/shared/ui';
import { useGate, useUnit } from 'effector-react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { $isWishPending, $wish, $wishError, PageGate } from '../model';
import { WishPageMode } from '../types';
import { WishForm } from './wish-form';

const TEXT_VARIANTS: Record<
  WishPageMode,
  {
    title: string;
    description: string;
  }
> = {
  create: {
    title: 'Новое желание',
    description: 'Добавьте новое желание в ваш список!',
  },
  edit: {
    title: 'Ваше желание',
    description: 'Отредактируйте ваше желание!',
  },
};

export function WishPage() {
  const { wishId } = useParams();
  const navigate = useNavigate();

  useGate(PageGate, { wishId });

  const [wish, pending, error] = useUnit([$wish, $isWishPending, $wishError]);

  if (pending) {
    return <WishPageSkeleton />;
  }

  if (error) return <Text>Error: {error.message}</Text>;

  const currentMode: WishPageMode = wishId ? 'edit' : 'create';

  function goBack() {
    navigate(-1);
  }

  return (
    <Flex className="w-full p-6" direction="column" gap={6}>
      <Button variant="outline" type="button" onClick={goBack}>
        <ArrowLeft />
        Назад
      </Button>
      <Flex direction="column">
        <Text size="2xl" weight="bold">
          {TEXT_VARIANTS[currentMode].title} {currentMode === 'edit' && wish && `- ${wish.title}`}
        </Text>
        <Text size="sm" variant="muted">
          {TEXT_VARIANTS[currentMode].description}
        </Text>
      </Flex>
      <WishForm mode={currentMode} initialValues={wish} />
    </Flex>
  );
}

function WishPageSkeleton() {
  return (
    <Flex className="p-6 max-w-3xl w-full" direction="column" gap={6}>
      <Skeleton className="h-8 w-24" />
      <Flex className="w-full" direction="column" gap={2}>
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-6 w-full" />
      </Flex>
      <Flex className="w-full" direction="column" gap={4}>
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-8 w-full" />
        <Flex gap={4}>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/2" />
        </Flex>
      </Flex>
    </Flex>
  );
}
