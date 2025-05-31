import { Wish } from '@/shared/types/wish';
import { $isReservationCancelling, $isReserving, wishReservationCanceled } from '../model';
import { useUnit } from 'effector-react';
import { wishReserved } from '../model';
import { LoadingButton } from '@/shared/ui';
import { Lock, Unlock } from 'lucide-react';
import { $user } from '@/entities/user';

export function UserWishReservationActions({ wish }: { wish: Wish }) {
  const [onReserve, onUnreserve, isReserving, isReservationCancelling, currentUser] = useUnit([
    wishReserved,
    wishReservationCanceled,
    $isReserving,
    $isReservationCancelling,
    $user,
  ]);

  if (wish.status === 'available') {
    return (
      <LoadingButton loading={isReserving} onClick={() => onReserve(wish.id)}>
        <Lock className="h-4 w-4" />
        Зарезервировать
      </LoadingButton>
    );
  }

  if (wish.status === 'reserved' && currentUser?.id === wish.reserved.user_id) {
    return (
      <LoadingButton variant="destructive" loading={isReservationCancelling} onClick={() => onUnreserve(wish.id)}>
        <Unlock className="h-4 w-4" />
        Отменить резервирование
      </LoadingButton>
    );
  }

  return null;
}
