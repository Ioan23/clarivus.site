"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { createOrder, type CustomerInfo } from "@/lib/orders";

function formatPrice(bani: number) {
  return (bani / 100).toLocaleString("ro-RO", {
    style: "currency",
    currency: "RON",
    minimumFractionDigits: 2,
  });
}

const empty: CustomerInfo = {
  name: "",
  phone: "",
  email: "",
  county: "",
  city: "",
  address: "",
  notes: "",
};

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<CustomerInfo>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof CustomerInfo, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setError("");
    if (!form.name || !form.phone || !form.county || !form.city || !form.address) {
      setError("Te rugăm completează câmpurile obligatorii (*).");
      return;
    }
    setSubmitting(true);
    try {
      const orderId = await createOrder(form, items, total);
      // trimite notificarea pe email (nu blochează comanda dacă eșuează)
      try {
        await fetch("/api/notify-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, customer: form, items, total }),
        });
      } catch (notifyError) {
        console.error("Notificarea pe email nu a putut fi trimisă:", notifyError);
      }
      clear();
      router.push(`/comanda-plasata?id=${orderId}`);
    } catch (e) {
      console.error(e);
      setError("A apărut o eroare la plasarea comenzii. Încearcă din nou.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">Coșul tău este gol</h1>
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
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-semibold">Finalizează comanda</h1>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Formular */}
        <div className="space-y-4">
          <Field label="Nume complet *" value={form.name} onChange={(v) => update("name", v)} />
          <Field label="Telefon *" value={form.phone} onChange={(v) => update("phone", v)} />
          <Field label="Email" value={form.email} onChange={(v) => update("email", v)} />
          <Field label="Județ *" value={form.county} onChange={(v) => update("county", v)} />
          <Field label="Oraș / Localitate *" value={form.city} onChange={(v) => update("city", v)} />
          <Field label="Adresă (stradă, număr) *" value={form.address} onChange={(v) => update("address", v)} />
          <div>
            <label className="mb-1 block text-sm text-gray-600">Observații (opțional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={3}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Sumar comandă */}
        <div>
          <div className="rounded-xl border p-6">
            <h2 className="mb-4 font-semibold">Comanda ta</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.qty}
                  </span>
                  <span className="font-medium">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t pt-4">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">{formatPrice(total)}</span>
            </div>

            <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
              Plată: <span className="font-medium text-black">Ramburs</span> (la livrare)
            </div>

            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-6 w-full rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
            >
              {submitting ? "Se plasează..." : "Plasează comanda"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm text-gray-600">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 text-sm"
      />
    </div>
  );
}