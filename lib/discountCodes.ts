import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export type DiscountCode = {
  id: string;
  cod: string;
  activ: boolean;
  reducere: number; // procent
  expira?: Timestamp | null;
};

export async function validateDiscountCode(codIntrodus: string): Promise<DiscountCode | null> {
  const codNormalizat = codIntrodus.trim().toUpperCase();
  if (!codNormalizat) return null;

  const q = query(collection(db, "discountCodes"), where("cod", "==", codNormalizat));
  const snap = await getDocs(q);
  if (snap.empty) return null;

  const doc = snap.docs[0];
  const data = { id: doc.id, ...doc.data() } as DiscountCode;

  if (!data.activ) return null;
  if (data.expira && data.expira.toMillis() < Date.now()) return null;

  return data;
}
