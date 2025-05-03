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

export type Wishlist = {
  id: number;
  title: string;
  deletable?: boolean;
};

export type WishlistData = Omit<Wishlist, 'id'>;
