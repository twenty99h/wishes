import { WishTab } from '@/shared/types/wish';
import { NavButton } from '@/shared/ui';

type WishesTabItemProps = {
  wishTab: WishTab;
  active?: boolean;
};

export function WishesTabItem({ wishTab, active }: WishesTabItemProps) {
  return (
    <NavButton
      to={`/wishes/${wishTab.id}`}
      className="rounded-3xl cursor-pointer"
      variant={active ? 'default' : 'secondary'}
    >
      {wishTab.title}
    </NavButton>
  );
}
