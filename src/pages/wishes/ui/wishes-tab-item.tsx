import { WishTab } from '@/shared/types/wish';
import { Button } from '@/shared/ui';
import { Link } from 'react-router';

type WishesTabItemProps = {
  wishTab: WishTab;
  active?: boolean;
};

export function WishesTabItem({ wishTab, active }: WishesTabItemProps) {
  return (
    <Link to={`/wishes/${wishTab.id}`}>
      <Button className="rounded-3xl cursor-pointer" variant={active ? 'default' : 'secondary'}>
        {wishTab.title}
      </Button>
    </Link>
  );
}
