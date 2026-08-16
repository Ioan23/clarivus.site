"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Confirmare() {
  const params = useSearchParams();
  const id = params.get("id");

  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
        ✓
      </div>
      <h1 className="text-3xl font-semibold">Comandă plasată cu succes!</h1>
      <p className="mt-4 text-gray-600">
        Îți mulțumim! Comanda ta a fost înregistrată și te vom contacta telefonic
        pentru confirmare.
      </p>
      {id && (
        <p className="mt-4 text-sm text-gray-400">
          Număr comandă: <span className="font-mono text-gray-700">{id}</span>
        </p>
      )}
      <p className="mt-2 text-sm text-gray-500">
        Plata se face ramburs, la livrare.
      </p>

      <Link
        href="/produse"
        className="mt-10 inline-block rounded-full bg-[#c6a253] px-8 py-3 text-sm font-medium text-[#0a1728] transition hover:opacity-90"
      >
        Continuă cumpărăturile
      </Link>
    </main>
  );
}

export default function OrderPlacedPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Se încarcă...</div>}>
      <Confirmare />
    </Suspense>
  );
}