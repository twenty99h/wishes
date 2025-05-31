import { Wish } from '@/shared/types/wish';
import { Card, CardContent, CardFooter, Flex, Skeleton, Text } from '@/shared/ui';
import { Link, useParams } from 'react-router';

type WishesListProps = {
  wishes: Wish[];
  isPending?: boolean;
  error?: Error | null;
};

export function WishesList({ wishes, isPending, error }: WishesListProps) {
  const { userId, userWishlistId } = useParams();

  if (isPending) {
    return <WishesListSkeleton />;
  }

  if (error) {
    return <div>Wishlists Error: {error.message}</div>;
  }

  if (!userWishlistId) {
    return (
      <Flex className="w-full p-16" justify="center" align="center">
        <Text size="xl">Выберите какой-нибудь вишлист!</Text>
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
        <Link to={`/users/${userId}/${userWishlistId}/${wish.id}`} key={wish.id}>
          <Card className="py-4 rounded-3xl gap-3">
            <CardContent className="px-4">
              <img className="w-full rounded-3xl h-64 object-cover" src={wish.image_url} alt={wish.title} />
            </CardContent>
            <CardFooter>
              <Flex direction="column">
                <Text weight="semibold" size="lg">
                  {wish.title}
                </Text>
                <Text>{wish.description}</Text>
              </Flex>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function WishesListSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} className="w-full rounded-3xl h-78" />
      ))}
    </div>
  );
}
