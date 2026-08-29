import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export type Promotion = {
  id: string;
  nume: string;
  activ: boolean;
  tip: "toate" | "brand" | "categorie" | "produse";
  valoare: string | string[]; // gol/ignorat la "toate", brand/categorie string, sau array de product IDs la "produse"
  reducere: number; // procent, 1-90
  start?: Timestamp | null;
  final?: Timestamp | null;
};

export async function getActivePromotions(): Promise<Promotion[]> {
  const q = query(collection(db, "promotions"), where("activ", "==", true));
  const snap = await getDocs(q);
  const now = Date.now();
  const promotions = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Promotion[];
  return promotions.filter((promo) => {
    // dacă are start/final, verificăm că suntem în interval
    if (promo.start && promo.start.toMillis() > now) return false;
    if (promo.final && promo.final.toMillis() < now) return false;
    return true;
  });
}
