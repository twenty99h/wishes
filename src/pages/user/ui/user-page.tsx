import { useGate, useUnit } from 'effector-react';
import { useParams } from 'react-router';
import { PageGate, userQuery } from '../model';
import { UserLayout } from './user-layout';

export function UserPage() {
  const { userId, userWishlistId } = useParams();

  useGate(PageGate, { userId, userWishlistId });

  const { data: user, pending, error } = useUnit(userQuery);

  return <UserLayout user={user} pending={pending} error={error} />;
}
