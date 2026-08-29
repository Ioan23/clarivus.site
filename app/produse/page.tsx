"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts, type Product } from "@/lib/products";
import { formatPrice, getEffectivePrice, isOnSale, getDiscountPercent } from "@/lib/pricing";
import { getActivePromotions, type Promotion } from "@/lib/promotions";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    getProducts()
      .then((items) => setProducts(items))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getActivePromotions().then(setPromotions);
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-1 text-3xl font-semibold">Ochelari și rame</h1>
      <p className="mb-8 text-gray-500">
        {loading ? "Se încarcă..." : `${products.length} produse disponibile`}
      </p>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <Link key={p.id} href={`/produse/${p.id}`}>
            <article className="group">
              <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-gray-200">
                {p.images && p.images.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <span className="text-sm text-gray-400">Fără imagine</span>
                )}
              </div>
              <div className="mt-3">
                <p className="text-xs uppercase tracking-wide text-gray-400">{p.brand}</p>
                <h2 className="text-sm font-medium text-gray-900">{p.name}</h2>
                {isOnSale(p, promotions) ? (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-semibold text-[#0a1728]">{formatPrice(getEffectivePrice(p, promotions))}</span>
                    <span className="text-sm text-gray-400 line-through">{formatPrice(p.price)}</span>
                    <span className="rounded bg-[#c6a253] px-1.5 py-0.5 text-xs font-semibold text-white">
                      -{getDiscountPercent(p, promotions)}%
                    </span>
                  </div>
                ) : (
                  <p className="mt-1 font-semibold">{formatPrice(p.price)}</p>
                )}
                {p.stock === 0 && <p className="mt-1 text-xs text-red-500">Stoc epuizat</p>}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}