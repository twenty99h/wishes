import { Wishlist, WishlistData } from '@/shared/types/wish';
import { db } from '@@/firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { WISHLISTS_COLLECTION, convertDocsToObjects } from './api';

export async function getWishlists(): Promise<{ wishlists: Wishlist[] }> {
  const wishlistsRef = collection(db, WISHLISTS_COLLECTION);
  const snapshot = await getDocs(wishlistsRef);
  const wishlists = convertDocsToObjects<Wishlist>(snapshot);

  return { wishlists };
}

export async function getWishlist(id: Wishlist['id']): Promise<Wishlist> {
  const wishlistRef = doc(db, WISHLISTS_COLLECTION, String(id));
  const snapshot = await getDoc(wishlistRef);

  if (!snapshot.exists()) {
    throw new Error(`Wishlist with id ${id} not found`);
  }

  const wishlistData = snapshot.data();

  return {
    id: snapshot.id,
    ...wishlistData,
  } as Wishlist;
}

export async function createWishlist(data: WishlistData): Promise<Wishlist> {
  const wishlistsRef = collection(db, WISHLISTS_COLLECTION);
  const docRef = await addDoc(wishlistsRef, data);

  return {
    id: docRef.id,
    ...data,
  };
}

export async function updateWishlist({ id, title }: Omit<Wishlist, 'deletable'>): Promise<Wishlist> {
  const wishlistRef = doc(db, WISHLISTS_COLLECTION, String(id));
  await updateDoc(wishlistRef, { title });

  return {
    id,
    title,
  };
}

export async function deleteWishlist({ id }: Pick<Wishlist, 'id'>) {
  // Получаем все вишлисты, чтобы определить следующий ID после удаления
  const { wishlists } = await getWishlists();
  const currentIndex = wishlists.findIndex((wishlist) => wishlist.id === id);
  const nextIndex = currentIndex < wishlists.length - 1 ? currentIndex + 1 : currentIndex - 1;
  const nextId = nextIndex >= 0 ? wishlists[nextIndex].id : null;

  // Удаляем вишлист
  const wishlistRef = doc(db, WISHLISTS_COLLECTION, String(id));
  await deleteDoc(wishlistRef);

  return {
    id,
    nextId: nextId || 0,
  };
}
