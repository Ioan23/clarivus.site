import type { Product } from "./products";

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
 * Preț efectiv al unui produs — cel pe care clientul îl plătește acum.
 * Dacă produsul are salePrice valid (mai mic decât price), îl folosim.
 * Altfel, prețul normal.
 */
export function getEffectivePrice(product: Pick<Product, "price" | "salePrice">): number {
  if (
    typeof product.salePrice === "number" &&
    product.salePrice > 0 &&
    product.salePrice < product.price
  ) {
    return product.salePrice;
  }
  return product.price;
}

/**
 * True dacă produsul e la reducere (salePrice valid, mai mic decât price).
 */
export function isOnSale(product: Pick<Product, "price" | "salePrice">): boolean {
  return getEffectivePrice(product) < product.price;
}

/**
 * Procentul de reducere, rotunjit (ex: 20 pentru -20%).
 * Returnează 0 dacă produsul nu e la reducere.
 */
export function getDiscountPercent(product: Pick<Product, "price" | "salePrice">): number {
  if (!isOnSale(product)) return 0;
  const effective = getEffectivePrice(product);
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