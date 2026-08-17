import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { CartItem } from "./cart";

export type CustomerInfo = {
  name: string;
  phone: string;
  email: string;
  county: string;
  city: string;
  address: string;
  notes: string;
};

export async function createOrder(
  customer: CustomerInfo,
  items: CartItem[],
  total: number
): Promise<string> {
  const order = {
    customer,
    items: items.map((i) => ({
      id: i.id,
      name: i.name,
      brand: i.brand,
      price: i.price,
      qty: i.qty,
      ...(i.config ? { config: i.config } : {}),
    })),
    total,
    currency: "RON",
    paymentMethod: "ramburs",
    status: "nou",
    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(collection(db, "orders"), order);
  return ref.id;
}