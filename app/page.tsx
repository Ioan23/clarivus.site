"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts, type Product } from "@/lib/products";

function formatPrice(bani: number) {
  return (bani / 100).toLocaleString("ro-RO", {
    style: "currency",
    currency: "RON",
    minimumFractionDigits: 2,
  });
}

function EyeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 30 Q60 5 115 30 Q60 55 5 30 Z" stroke="#c6a253" strokeWidth="2.5" />
      <circle cx="60" cy="30" r="15" stroke="#c6a253" strokeWidth="2.5" />
      <circle cx="60" cy="30" r="4.5" fill="#c6a253" />
    </svg>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((items) => setProducts(items))
      .catch((e) => console.error("Eroare la citirea produselor:", e))
      .finally(() => setLoading(false));
  }, []);

  const featured = products.slice(0, 4);

  return (
    <main>
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#0a1728] via-[#0c1d33] to-[#0f2238] px-4 py-24 text-center text-white">
        <div className="mx-auto mb-8 flex flex-col items-center">
          <EyeLogo className="h-14 w-auto" />
          <p className="mt-4 text-2xl font-light tracking-[0.4em]">CLARIVUS</p>
          <p className="mt-1 text-[10px] font-light tracking-[0.35em] text-[#c6a253]">
            PREMIUM EYEWEAR
          </p>
        </div>

        <h1 className="mx-auto max-w-3xl font-serif text-4xl font-medium leading-tight md:text-5xl">
          Claritate în fiecare privire.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-gray-300 md:text-lg">
          Ochelari premium și consultații optometrice, cu grija unui optician cu experiență.
        </p>

        <Link
          href="/produse"
          className="mt-10 inline-block rounded-full border border-[#c6a253] bg-[#c6a253] px-8 py-3 text-sm font-medium uppercase tracking-wide text-[#0a1728] transition hover:bg-transparent hover:text-[#c6a253]"
        >
          Vezi produsele
        </Link>
      </section>

      {/* PRODUSE RECOMANDATE */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Produse recomandate</h2>
          <Link href="/produse" className="text-sm text-gray-500 hover:text-black">
            Vezi toate →
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Se încarcă...</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
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
                    <h3 className="text-sm font-medium text-gray-900">{p.name}</h3>
                    <p className="mt-1 font-semibold">{formatPrice(p.price)}</p>
                    {p.stock === 0 && <p className="mt-1 text-xs text-red-500">Stoc epuizat</p>}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* DE CE CLARIVUS */}
      <section className="border-t bg-[#f8f7f4] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-semibold text-gray-900">
            De ce Clarivus
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Feature
              title="Optician cu experiență"
              text="Fiecare pereche e aleasă și verificată de un profesionist, nu doar vândută."
            />
            <Feature
              title="Consultație optometrică"
              text="Îți verificăm vederea și recomandăm lentilele potrivite pentru tine."
            />
            <Feature
              title="Calitate premium"
              text="Rame și lentile de la producători de încredere, pentru confort și claritate."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#c6a253]">
        <EyeLogo className="h-6 w-auto" />
      </div>
      <h3 className="mb-2 font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}
