import { $isUserLoggedIn } from '@/entities/user';
import { useUnit } from 'effector-react';
import { Navigate, Outlet } from 'react-router';

export function WishesLayout() {
  const isUserLoggedIn = useUnit($isUserLoggedIn);

  if (!isUserLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}
