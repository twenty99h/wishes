import { createGate } from 'effector-react';

export const PageGate = createGate<{ userId?: string; userWishlistId?: string; userWishId?: string }>();
