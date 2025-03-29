import { Flex } from '@/shared/ui';
import { useTabsStore } from '../model';
import { WishesTabItem } from './wishes-tab-item';
import { WishesTabDialog } from './wishes-tab-dialog';
import { WishTab } from '@/shared/types/wish';

type WishesTabsProps = {
  wishlists?: WishTab[];
};

export function WishesTabs({ wishlists }: WishesTabsProps) {
  const { activeTab } = useTabsStore();

  if (!wishlists) {
    return null;
  }

  return (
    <Flex gap={2}>
      {wishlists.map((tab) => (
        <WishesTabItem key={tab.id} wishTab={tab} active={tab.id === activeTab} />
      ))}
      <WishesTabDialog />
    </Flex>
  );
}
