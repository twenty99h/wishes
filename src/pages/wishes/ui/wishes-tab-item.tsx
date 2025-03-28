import { WishTab } from '@/shared/types/wish';
import { Button } from '@/shared/ui';

type WishesTabItemProps = {
  wishTab: WishTab;
  active?: boolean;
  onClick?: () => void;
};

export function WishesTabItem({ wishTab, active, onClick }: WishesTabItemProps) {
  return (
    <Button className="rounded-3xl" variant={active ? 'default' : 'secondary'} onClick={onClick}>
      {wishTab.title}
    </Button>
  );
}
