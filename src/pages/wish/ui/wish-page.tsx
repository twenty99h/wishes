import { Flex, Skeleton, Text } from '@/shared/ui';
import { WishForm } from './wish-form';
import { useParams } from 'react-router';
import { WishPageMode } from '../types';
import { useWish } from '../hooks';

export function WishPage() {
  const { wishId } = useParams();

  const currentMode: WishPageMode = wishId ? 'edit' : 'create';

  const { data: wish, isLoading, error } = useWish(Number(wishId));

  if (isLoading) {
    return <WishPageSkeleton />;
  }

  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <Flex className="w-full p-6" direction="column" gap={6}>
      <Text size="2xl" weight="bold">
        {currentMode === 'edit' ? wish?.title : 'Новое желание'}
      </Text>
      <WishForm mode={currentMode} initialValues={wish} />
    </Flex>
  );
}

function WishPageSkeleton() {
  return (
    <Flex className="p-6" direction="column" gap={6}>
      <Skeleton className="h-6 w-1/4" />
      <Flex direction="column" gap={4}>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Flex gap={4}>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/2" />
        </Flex>
      </Flex>
    </Flex>
  );
}
