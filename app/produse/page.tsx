"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/pricing";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((items) => setProducts(items))
      .finally(() => setLoading(false));
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
                <p className="mt-1 font-semibold">{formatPrice(p.price)}</p>
                {p.stock === 0 && <p className="mt-1 text-xs text-red-500">Stoc epuizat</p>}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}