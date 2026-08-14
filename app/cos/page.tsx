"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

function formatPrice(bani: number) {
  return (bani / 100).toLocaleString("ro-RO", {
    style: "currency",
    currency: "RON",
    minimumFractionDigits: 2,
  });
}

export default function CartPage() {
  const { items, updateQty, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">Coșul tău este gol</h1>
        <p className="mt-3 text-gray-500">Nu ai adăugat încă niciun produs.</p>
        <Link
          href="/produse"
          className="mt-8 inline-block rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Vezi produsele
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-semibold">Coșul tău</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-xl border p-4"
          >
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                  fără poză
                </div>
              )}
            </div>

            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-gray-400">{item.brand}</p>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(item.id, item.qty - 1)}
                className="h-8 w-8 rounded-full border text-lg leading-none hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-8 text-center">{item.qty}</span>
              <button
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="h-8 w-8 rounded-full border text-lg leading-none hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <div className="w-24 text-right font-semibold">
              {formatPrice(item.price * item.qty)}
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-sm text-gray-400 hover:text-red-500"
            >
              Șterge
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4 border-t pt-6">
        <p className="text-lg">
          Total: <span className="text-2xl font-bold">{formatPrice(total)}</span>
        </p>
        <Link
          href="/checkout"
          className="rounded-full bg-black px-10 py-4 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Finalizează comanda
        </Link>
      </div>
    </main>
  );
}