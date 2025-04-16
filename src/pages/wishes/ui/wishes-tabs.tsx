import { WishTab } from '@/shared/types/wish';
import { Flex, Skeleton } from '@/shared/ui';
import { useParams } from 'react-router';
import { WishesTabDialog } from './wishes-tab-dialog';
import { WishesTabItem } from './wishes-tab-item';

type WishesTabsProps = {
  wishlists: WishTab[];
  isPending?: boolean;
  error?: Error | null;
};

export function WishesTabs({ wishlists, isPending, error }: WishesTabsProps) {
  const { tabId } = useParams();

  if (isPending) {
    return <WishesTabsSkeleton />;
  }

  // TODO: Add toast for error and maybe retry with illustration
  if (error) {
    return <div>Wishlists Error: {error.message}</div>;
  }

  return (
    <Flex gap={2}>
      {wishlists.map((tab) => (
        <WishesTabItem key={tab.id} wishTab={tab} active={tab.id === Number(tabId)} />
      ))}
      <WishesTabDialog />
    </Flex>
  );
}

function WishesTabsSkeleton() {
  return (
    <Flex gap={2}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="rounded-3xl h-9 w-24" />
      ))}
    </Flex>
  );
}
