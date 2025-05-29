import { WishCard } from '@/features/wish-card';
import { Wish } from '@/shared/types/wish';
import { Flex, Skeleton, Text } from '@/shared/ui';
import { useParams } from 'react-router';

type WishesListProps = {
  wishes: Wish[];
  isPending?: boolean;
  error?: Error | null;
};

// TODO: Вынести это в фичу
export function WishesList({ wishes, isPending, error }: WishesListProps) {
  const { wishlistId } = useParams();

  if (isPending) {
    return <WishesListSkeleton />;
  }

  if (error) {
    return <div>Wishlists Error: {error.message}</div>;
  }

  if (!wishlistId) {
    return (
      <Flex className="w-full p-16" justify="center" align="center">
        <Text size="xl">Выберите какой-нибудь вишлист или создайте новый!</Text>
      </Flex>
    );
  }

  if (wishes.length === 0) {
    return (
      <Flex className="w-full p-16" justify="center" align="center">
        <Text size="xl">В этом вишлисте пока нет вишей!</Text>
      </Flex>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {wishes.map((wish) => (
        <WishCard key={wish.id} wish={wish} />
      ))}
    </div>
  );
}

function WishesListSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {Array.from({ length: 18 }).map((_, index) => (
        <Skeleton key={index} className="w-full rounded-3xl h-78" />
      ))}
    </div>
  );
}
