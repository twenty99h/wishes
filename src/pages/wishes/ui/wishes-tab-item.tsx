import { WishTab } from '@/shared/types/wish';
import { Button } from '@/shared/ui';
import { useTabsStore } from '../model';

type WishesTabItemProps = {
  wishTab: WishTab;
  active?: boolean;
};

export function WishesTabItem({ wishTab, active }: WishesTabItemProps) {
  const { setActiveTab } = useTabsStore();

  return (
    <Button
      className="rounded-3xl cursor-pointer"
      variant={active ? 'default' : 'secondary'}
      onClick={() => setActiveTab(wishTab.id)}
    >
      {wishTab.title}
    </Button>
  );
}
