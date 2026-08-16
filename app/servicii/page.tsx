"use client";

import { useState } from "react";

const SERVICES = [
  { name: "Reparații ochelari", price: "50 lei", desc: "Reparăm ramele deteriorate și readucem ochelarii la viață." },
  { name: "Sudură ochelari", price: "100 lei", desc: "Sudură profesională pentru rame metalice rupte." },
  { name: "Schimb pernițe (nas)", price: "30 lei", desc: "Înlocuim pernițele nazale uzate pentru confort sporit." },
  { name: "Îndreptat ochelari", price: "Gratuit", desc: "Reajustăm și îndreptăm ramele deformate." },
  { name: "Transfer lentile în altă ramă", price: "Gratuit* / 50 lei", desc: "Gratuit dacă alegi o ramă din colecția noastră, 50 lei pentru rame aduse de tine." },
  { name: "Montaj lentile aduse de client", price: "100 lei", desc: "Montăm lentilele tale într-o ramă la alegere." },
  { name: "Consultație optometrică la domiciliu", price: "100 lei", desc: "Optică mobilă — venim la tine pentru consultație completă." },
];

export default function ServiciiPage() {
  const [form, setForm] = useState({ name: "", phone: "", service: SERVICES[0].name, details: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setError("");
    if (!form.name || !form.phone) {
      setError("Te rugăm completează numele și telefonul.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/notify-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("fail");
      setSent(true);
    } catch {
      setError("A apărut o eroare. Te rugăm încearcă din nou sau sună-ne direct.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#0a1728] to-[#0f2238] px-4 py-16 text-center text-white">
        <h1 className="text-3xl font-semibold md:text-4xl">Servicii Clarivus</h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-300">
          Reparații, montaj și consultații optometrice, cu grija unui optician cu experiență.
        </p>
      </section>

      {/* LISTA SERVICII */}
      <section className="mx-auto max-w-4xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.name} className="rounded-xl border p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold text-gray-900">{s.name}</h2>
                <span className="whitespace-nowrap rounded-full bg-[#0a1728] px-3 py-1 text-xs font-medium text-[#c6a253]">
                  {s.price}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-400">
          * Transfer lentile gratuit la alegerea unei rame din colecția noastră.
        </p>
      </section>

      {/* FORMULAR PROGRAMARE */}
      <section className="border-t bg-[#f8f7f4] px-4 py-14">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-2 text-center text-2xl font-semibold text-gray-900">
            Programează un serviciu
          </h2>
          <p className="mb-8 text-center text-sm text-gray-600">
            Completează formularul și te contactăm telefonic.
          </p>

          {sent ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
              <p className="text-lg font-semibold text-green-700">Cererea a fost trimisă!</p>
              <p className="mt-2 text-sm text-gray-600">Te vom contacta în cel mai scurt timp.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-gray-600">Nume complet *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">Telefon *</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">Serviciul dorit</label>
                <select
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
                >
                  {SERVICES.map((s) => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">Detalii (opțional)</label>
                <textarea
                  value={form.details}
                  onChange={(e) => update("details", e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full rounded-full bg-[#c6a253] px-8 py-3 text-sm font-medium text-[#0a1728] transition hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Se trimite..." : "Trimite cererea"}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}