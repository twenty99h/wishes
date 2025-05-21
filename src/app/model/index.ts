import { initNavigation } from '@/shared/lib/router';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { NavigateFunction } from 'react-router';

export const AppGate = createGate<{ navigate: NavigateFunction }>();

sample({
  clock: AppGate.open,
  fn: ({ navigate }) => navigate,
  target: initNavigation,
});
