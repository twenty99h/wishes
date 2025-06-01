export type WishStatus = 'available' | 'reserved' | 'purchased';
export type WishVisibility = 'public' | 'private' | 'friends-only';
export type WishReservation = {
  user_id: string;
  username: string;
  avatar_url: string | null;
};

export type Wish = {
  id: number;
  title: string;
  description?: string;
  price?: number;
  status: WishStatus;
  visibility: WishVisibility;
  reserved?: WishReservation;
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

export type WishCreateData = {
  user_id: string;
  title?: string;
  description?: string;
  price?: number;
  status?: 'available' | 'reserved' | 'purchased';
  product_url?: string;
  image_url?: string;
  file?: File;
  wishlist_id: number;
};

export type WishUpdateData = Wish & { file?: File };
