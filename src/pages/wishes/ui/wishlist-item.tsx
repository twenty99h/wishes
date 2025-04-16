import { Wishlist } from '@/shared/types/wish';
import { NavButton } from '@/shared/ui';

type WishesTabItemProps = {
  wishlist: Wishlist;
  active?: boolean;
};

export function WishlistItem({ wishlist, active }: WishesTabItemProps) {
  return (
    <div className="relative flex items-center">
      <NavButton
        to={`/wishes/${wishlist.id}`}
        className="rounded-3xl cursor-pointer"
        variant={active ? 'default' : 'secondary'}
      >
        {wishlist.title}
      </NavButton>
      {/* <Button
        size="icon"
        variant="ghost"
        className="ml-1 absolute right-0 top-1/2 -translate-y-1/2"
        onClick={() => setEditOpen(true)}
        aria-label="Редактировать вишлист"
      >
        <Pencil size={16} />
      </Button> */}
      {/* <WishlistDialog mode="edit" open={editOpen} onOpenChange={setEditOpen} wishlist={wishlist} /> */}
    </div>
  );
}
