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

function lei(n: number) {
  return n.toLocaleString("ro-RO", {
    style: "currency",
    currency: "RON",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
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
          className="mt-8 inline-block rounded-full bg-[#c6a253] px-8 py-3 text-sm font-medium text-[#0a1728] transition hover:opacity-90"
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
          <div key={item.id} className="rounded-xl border p-4">
            <div className="flex items-center gap-4">
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

            {/* Detaliile configurației — doar pentru ochelarii configurați */}
            {item.config && (
              <div className="mt-4 ml-24 rounded-lg bg-gray-50 p-4 text-sm">
                <p className="mb-2 font-medium text-[#0a1728]">
                  Detalii ochelari configurați
                </p>
                <ul className="space-y-1 text-gray-600">
                  <li>
                    Lentile: {item.config.lentila.nume} (index{" "}
                    {item.config.lentila.index}) — {lei(item.config.lentila.pret)}
                  </li>
                  {item.config.albastru && (
                    <li>
                      Filtru lumină albastră — {lei(item.config.albastruPret)}
                    </li>
                  )}
                  {item.config.soare && (
                    <li>
                      {item.config.soare.nume} — {lei(item.config.soare.pret)}
                    </li>
                  )}
                  <li className="pt-1">
                    Rețetă:{" "}
                    {item.config.reteta.metoda === "manual" &&
                    item.config.reteta.dioptrii ? (
                      <span>
                        OD {item.config.reteta.dioptrii.odSph || "—"}/
                        {item.config.reteta.dioptrii.odCyl || "—"}/
                        {item.config.reteta.dioptrii.odAx || "—"} · OS{" "}
                        {item.config.reteta.dioptrii.osSph || "—"}/
                        {item.config.reteta.dioptrii.osCyl || "—"}/
                        {item.config.reteta.dioptrii.osAx || "—"}
                        {item.config.reteta.dioptrii.pd
                          ? ` · PD ${item.config.reteta.dioptrii.pd}`
                          : ""}
                        {item.config.reteta.dioptrii.add
                          ? ` · ADD ${item.config.reteta.dioptrii.add}`
                          : ""}
                      </span>
                    ) : item.config.reteta.metoda === "poza" ? (
                      <span className="text-green-700">poză încărcată ✓</span>
                    ) : (
                      <span>consultație / aduce rețeta la magazin</span>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4 border-t pt-6">
        <div className="flex w-full max-w-xs items-center justify-between text-lg">
          <span className="text-gray-600">Total</span>
          <span className="font-bold">{formatPrice(total)}</span>
        </div>
        <Link
          href="/checkout"
          className="inline-block rounded-full bg-[#c6a253] px-8 py-3 text-sm font-medium text-[#0a1728] transition hover:opacity-90"
        >
          Finalizează comanda
        </Link>
      </div>
    </main>
  );
}