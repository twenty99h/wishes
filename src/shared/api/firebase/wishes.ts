import { Wish } from '@/shared/types/wish';
import { db } from '@/../firebase';
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { WISHES_COLLECTION, convertDocsToObjects } from './api';

export async function getWishes(wishlistId: Wish['id']) {
  const wishesRef = collection(db, WISHES_COLLECTION);
  const q = query(wishesRef, where('wishlistId', '==', wishlistId));
  const snapshot = await getDocs(q);

  return convertDocsToObjects<Wish>(snapshot);
}

export async function getWish(id: Wish['id']) {
  const wishRef = doc(db, WISHES_COLLECTION, String(id));
  const snapshot = await getDoc(wishRef);

  if (!snapshot.exists()) {
    throw new Error(`Wish with id ${id} not found`);
  }

  return {
    id: Number(snapshot.id),
    ...snapshot.data(),
  } as Wish;
}

export async function createWish(data: Omit<Wish, 'id'>) {
  const wishesRef = collection(db, WISHES_COLLECTION);
  const docRef = await addDoc(wishesRef, data);

  return {
    id: Number(docRef.id),
    ...data,
  } as Wish;
}

export async function updateWish({ id, ...data }: Wish) {
  const wishRef = doc(db, WISHES_COLLECTION, String(id));
  await updateDoc(wishRef, data);

  return {
    id,
    ...data,
  } as Wish;
}

export async function deleteWish(id: Wish['id']) {
  const wishRef = doc(db, WISHES_COLLECTION, String(id));
  await deleteDoc(wishRef);

  return { id };
}
