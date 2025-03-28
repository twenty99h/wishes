export type Wish = {
  id: number;
  title: string;
  description?: string;
  price?: { amount: number; currency: string };
  isVisible: boolean;
  isFulfilled: boolean;
  reservedBy?: number;
  productUrl?: string;
  imageUrl?: string;
};

export type WishTab = {
  id: number;
  title: string;
};
