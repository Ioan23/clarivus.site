"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { createOrder, type CustomerInfo } from "@/lib/orders";
import { formatPrice } from "@/lib/pricing";
import { validateDiscountCode, type DiscountCode } from "@/lib/discountCodes";

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
  const [discountInput, setDiscountInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [discountError, setDiscountError] = useState("");
  const [checkingDiscount, setCheckingDiscount] = useState(false);

  function update(field: keyof CustomerInfo, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleApplyDiscount() {
    setDiscountError("");
    setCheckingDiscount(true);
    const result = await validateDiscountCode(discountInput);
    setCheckingDiscount(false);
    if (!result) {
      setDiscountError("Cod invalid sau expirat.");
      setAppliedDiscount(null);
      return;
    }
    setAppliedDiscount(result);
  }

  const originalTotal = items.reduce(
    (s, i) => s + (i.originalPrice ?? i.price) * i.qty,
    0
  );
  const finalTotal = appliedDiscount
    ? Math.round(originalTotal * (1 - appliedDiscount.reducere / 100))
    : total;

  async function handleSubmit() {
    setError("");
    if (!form.name || !form.phone || !form.county || !form.city || !form.address) {
      setError("Te rugăm completează câmpurile obligatorii (*).");
      return;
    }
    if (/\d/.test(form.name)) {
      setError("Numele nu poate conține cifre.");
      return;
    }
    const telefonCurat = form.phone.replace(/[\s-]/g, "");
    const telefonValid = /^(\+40|0040|0)7\d{8}$/.test(telefonCurat);
    if (!telefonValid) {
      setError("Numărul de telefon nu este valid. Format acceptat: 07XXXXXXXX sau +407XXXXXXXX.");
      return;
    }
    if (form.email.trim() !== "") {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
      if (!emailValid) {
        setError("Adresa de email nu este validă.");
        return;
      }
    }
    setSubmitting(true);
    try {
      const orderId = await createOrder(
        form,
        items,
        finalTotal,
        appliedDiscount ? { cod: appliedDiscount.cod, reducere: appliedDiscount.reducere } : undefined
      );
      try {
        await fetch("/api/notify-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            customer: form,
            items,
            total: finalTotal,
            discountCode: appliedDiscount
              ? { cod: appliedDiscount.cod, reducere: appliedDiscount.reducere }
              : undefined,
          }),
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
          className="mt-8 inline-block rounded-full bg-[#c6a253] px-8 py-3 text-sm font-medium text-[#0a1728] transition hover:opacity-90"
        >
          Vezi produsele
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/cos"
        className="mb-6 inline-block text-sm text-gray-500 transition hover:text-[#0a1728]"
      >
        ← Înapoi la coș
      </Link>
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
                <div key={item.id} className="flex items-start justify-between gap-3 text-sm">
                  <span className="text-gray-700">
                    {item.name}
                    {item.qty > 1 && (
                      <span className="text-gray-400"> · cant. {item.qty}</span>
                    )}
                  </span>
                  <span className="whitespace-nowrap font-medium text-[#0a1728]">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">Cod de reducere</label>
              <div className="mt-1 flex gap-2">
                <input
                  type="text"
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                  placeholder="Introdu codul"
                  className="flex-1 rounded-lg border px-3 py-2 text-sm"
                  disabled={!!appliedDiscount}
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  disabled={checkingDiscount || !!appliedDiscount || !discountInput.trim()}
                  className="rounded-lg border-2 border-[#c6a253] px-4 py-2 text-sm font-medium text-[#0a1728] disabled:opacity-50"
                >
                  {checkingDiscount ? "..." : appliedDiscount ? "Aplicat" : "Aplică"}
                </button>
              </div>
              {discountError && <p className="mt-1 text-xs text-red-500">{discountError}</p>}
              {appliedDiscount && (
                <p className="mt-1 text-xs text-green-600">
                  Cod aplicat: -{appliedDiscount.reducere}% (calculat din prețul de listă)
                </p>
              )}
            </div>

            <div className="mt-4 flex justify-between border-t pt-4">
              <span className="font-semibold">Total</span>
              {appliedDiscount ? (
                <div>
                  <span className="text-sm text-gray-400 line-through">{formatPrice(total)}</span>
                  <span className="ml-2 text-xl font-bold">{formatPrice(finalTotal)}</span>
                </div>
              ) : (
                <span className="text-xl font-bold">{formatPrice(total)}</span>
              )}
            </div>

            <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
              Plată: <span className="font-medium text-black">Ramburs</span> (la livrare)
            </div>

            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-6 w-full rounded-full bg-[#c6a253] px-8 py-4 text-sm font-medium text-[#0a1728] transition hover:opacity-90 disabled:opacity-50"
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