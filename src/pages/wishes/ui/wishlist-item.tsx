import { Wishlist } from '@/shared/types/wish';
import { NavButton } from '@/shared/ui';

type WishesTabItemProps = {
  wishlist: Wishlist;
  active?: boolean;
};

export function WishlistItem({ wishlist, active }: WishesTabItemProps) {
  return (
    <NavButton
      to={`/wishes/${wishlist.id}`}
      className="rounded-3xl cursor-pointer"
      variant={active ? 'default' : 'secondary'}
    >
      {wishlist.title}
    </NavButton>
  );
}
