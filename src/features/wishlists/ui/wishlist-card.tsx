import { Wishlist } from '@/shared/types/wish';
import { NavButton } from '@/shared/ui';
import { useParams } from 'react-router';

type WishesTabItemProps = {
  wishlist: Wishlist;
  active?: boolean;
};

export function WishlistCard({ wishlist, active }: WishesTabItemProps) {
  const { userId } = useParams();

  return (
    <NavButton
      to={`/users/${userId}/${wishlist.id}`}
      className="rounded-3xl cursor-pointer"
      variant={active ? 'default' : 'secondary'}
    >
      {wishlist.title}
    </NavButton>
  );
}
