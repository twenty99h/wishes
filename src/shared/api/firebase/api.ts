import { DocumentData, QuerySnapshot } from 'firebase/firestore';

export const WISHLISTS_COLLECTION = 'wishlists';
export const WISHES_COLLECTION = 'wishes';

// Вспомогательная функция для преобразования Firestore документов в объекты
export const convertDocsToObjects = <T>(snapshot: QuerySnapshot<DocumentData>): T[] => {
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
};
