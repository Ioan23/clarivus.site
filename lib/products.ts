import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export type Product = {
  id: string;
  name: string;
  brand: string;
  type: "sunglasses" | "frame";
  category: string;
  price: number; // în bani: 899 lei = 89900
  currency: string;
  stock: number;
  sku: string;
  images: string[];
  description: string;
};

export async function getProducts(): Promise<Product[]> {
  const q = query(collection(db, "products"), where("active", "==", true));
  const snap = await getDocs(q);
  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Product[];
  return items.sort((a, b) => a.name.localeCompare(b.name, "ro"));
}

export async function getProduct(id: string): Promise<Product | null> {
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Product;
}