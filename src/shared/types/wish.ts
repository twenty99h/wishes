export type Wish = {
  id: number;
  title: string;
  description?: string;
  price?: number;
  status: 'available' | 'reserved' | 'purchased';
  visibility: 'public' | 'private' | 'friends-only';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reserved?: any;
  product_url?: string;
  image_url?: string;
  wishlist_id: Wishlist['id'];
  purchased_at: Date | null;
  reserved_at: Date | null;
  created_at: Date;
};

export type Wishlist = {
  id: number;
  title: string;
  deletable?: boolean;
};

export type WishlistData = Omit<Wishlist, 'id'>;
