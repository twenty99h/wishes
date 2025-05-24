export type Wish = {
  id: number;
  title: string;
  description?: string;
  price?: number;
  status: 'available' | 'reserved' | 'purchased';
  reservedBy?: number;
  productUrl?: string;
  imageUrl?: string;
  wishlistId: Wishlist['id'];
};

export type Wishlist = {
  id: number;
  title: string;
  deletable?: boolean;
};

export type WishlistData = Omit<Wishlist, 'id'>;
