import { WishCard } from '@/features/wish-card';
import { Wish } from '@/shared/types/wish';

type WishesListProps = {
  wishes: Wish[];
};

export function WishesList({ wishes }: WishesListProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {wishes.map((wish) => (
        <WishCard key={wish.id} wish={wish} />
      ))}
    </div>
  );
}
