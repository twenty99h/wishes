import { Wish } from '@/shared/types/wish';
import { Card, CardContent, CardFooter, Flex, Text } from '@/shared/ui';
import { Link, useParams } from 'react-router';

type WishCardProps = {
  wish: Wish;
};

export function WishCard({ wish }: WishCardProps) {
  const { wishlistId } = useParams();

  return (
    <Link to={`/wishes/${wishlistId}/${wish.id}`}>
      <Card className="py-4 rounded-3xl gap-3">
        <CardContent className="px-4">
          <img className="w-full rounded-3xl h-64 object-cover" src={wish.imageUrl} alt={wish.title} />
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
  );
}
