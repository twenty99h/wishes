import { Wish, WishTab } from '@/shared/types/wish';
import { createLazyRoute } from '@tanstack/react-router';
import { WishesList } from './wishes-list';
import { Flex } from '@/shared/ui';
import { WishesTabs } from './wishes-tabs';
import { useQuery } from '@tanstack/react-query';
import { API } from '@/shared/api';

export const Route = createLazyRoute('/wishes')({
  component: WishesPage,
});

const WISHES_MOCK: Wish[] = [
  ...Array(30)
    .fill(0)
    .map((_, i) => ({
      id: i + 3,
      title: `Wish ${i + 3}`,
      description: `Description ${i + 3}`,
      price: { amount: (i + 3) * 1000, currency: 'RUB' },
      isVisible: true,
      isFulfilled: false,
      reservedBy: undefined,
      productUrl: undefined,
      imageUrl: `https://picsum.photos/${i + 3}00`,
    })),
];

export function WishesPage() {
  const {
    data: wishlists,
    isPending,
    error,
  } = useQuery({
    queryKey: ['wishlists'],
    queryFn: async () => {
      const res = await API.get<WishTab[]>('/wishlist');
      return res.data;
    },
  });

  if (isPending) {
    return <div>Wishlists loading...</div>;
  }

  if (error) {
    return <div>Wishlists Error: {error.message}</div>;
  }

  console.log(wishlists);

  return (
    <Flex className="p-8" direction="column" gap={4}>
      <WishesTabs wishlists={wishlists || []} />
      <WishesList wishes={WISHES_MOCK} />
    </Flex>
  );
}
