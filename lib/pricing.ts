import type { Product } from "./products";
import type { Promotion } from "./promotions";

/**
 * Formatează un preț (în bani) ca string RON, ex: 89900 -> "899,00 RON"
 */
export function formatPrice(bani: number): string {
  return (bani / 100).toLocaleString("ro-RO", {
    style: "currency",
    currency: "RON",
  });
}

/**
 * Găsește cea mai specifică promoție potrivită pentru un produs.
 * Prioritate: produse (ID specific) > brand > categorie > toate.
 */
function findBestPromotion(
  product: Pick<Product, "id" | "brand" | "category">,
  promotions: Promotion[]
): Promotion | null {
  const byProduct = promotions.find(
    (p) => p.tip === "produse" && Array.isArray(p.valoare) && p.valoare.includes(product.id)
  );
  if (byProduct) return byProduct;

  const byBrand = promotions.find(
    (p) => p.tip === "brand" && p.valoare === product.brand
  );
  if (byBrand) return byBrand;

  const byCategory = promotions.find(
    (p) => p.tip === "categorie" && p.valoare === product.category
  );
  if (byCategory) return byCategory;

  const global = promotions.find((p) => p.tip === "toate");
  if (global) return global;

  return null;
}

/**
 * Preț efectiv al unui produs — cel pe care clientul îl plătește acum.
 * Ordine de prioritate:
 * 1. salePrice manual (cea mai specifică formă de reducere)
 * 2. promoție automată potrivită (produs > brand > categorie > toate)
 * 3. preț normal
 */
export function getEffectivePrice(
  product: Pick<Product, "id" | "brand" | "category" | "price" | "salePrice">,
  promotions: Promotion[] = []
): number {
  if (
    typeof product.salePrice === "number" &&
    product.salePrice > 0 &&
    product.salePrice < product.price
  ) {
    return product.salePrice;
  }

  const promo = findBestPromotion(product, promotions);
  if (promo && promo.reducere > 0 && promo.reducere < 100) {
    return Math.round(product.price * (1 - promo.reducere / 100));
  }

  return product.price;
}

/**
 * True dacă produsul e la reducere (salePrice manual sau promoție automată).
 */
export function isOnSale(
  product: Pick<Product, "id" | "brand" | "category" | "price" | "salePrice">,
  promotions: Promotion[] = []
): boolean {
  return getEffectivePrice(product, promotions) < product.price;
}

/**
 * Procentul de reducere, rotunjit (ex: 20 pentru -20%).
 * Returnează 0 dacă produsul nu e la reducere.
 */
export function getDiscountPercent(
  product: Pick<Product, "id" | "brand" | "category" | "price" | "salePrice">,
  promotions: Promotion[] = []
): number {
  if (!isOnSale(product, promotions)) return 0;
  const effective = getEffectivePrice(product, promotions);
  return Math.round((1 - effective / product.price) * 100);
}

/**
 * Formatează o valoare deja exprimată în LEI (nu în bani), ex: 500 -> "500,00 lei"
 * Folosită pentru prețurile din configuratorul de lentile, care sunt hardcodate
 * direct în lei, nu în bani ca produsele din Firestore.
 */
export function formatLei(lei: number): string {
  return lei.toLocaleString("ro-RO", {
    style: "currency",
    currency: "RON",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
