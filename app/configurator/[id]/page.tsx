"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  NIVELURI_LENTILE,
  FILTRU_ALBASTRU,
  TIPURI_SOARE,
} from "@/lib/lentile-config";

function lei(n: number) {
  return n.toLocaleString("ro-RO", {
    style: "currency",
    currency: "RON",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export default function ConfiguratorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { addItem } = useCart();
  const [frame, setFrame] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [nivelId, setNivelId] = useState<string>("");
  const [albastru, setAlbastru] = useState(false);
  const [soareId, setSoareId] = useState<string>("fara");

  // Rețetă
  const [metodaReteta, setMetodaReteta] = useState<string>("");
  const [reteta, setReteta] = useState({
    odSph: "",
    odCyl: "",
    odAx: "",
    osSph: "",
    osCyl: "",
    osAx: "",
    pd: "",
    add: "",
  });
  const [pozaNume, setPozaNume] = useState<string>("");
  const [pozaUrca, setPozaUrca] = useState(false);
  const [pozaUrl, setPozaUrl] = useState<string>("");

  useEffect(() => {
    getProduct(id)
      .then((p) => setFrame(p))
      .finally(() => setLoading(false));
  }, [id]);

  function updateReteta(camp: string, val: string) {
    setReteta((prev) => ({ ...prev, [camp]: val }));
  }

  async function handlePoza(file: File) {
    setPozaNume(file.name);
    setPozaUrl("");
    setPozaUrca(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const cale = `retete/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;
      const r = ref(storage, cale);
      await uploadBytes(r, file);
      // Reținem doar calea. Link-ul cu token îl generăm pe server (la comandă),
      // ca să nu deblocăm citirea publică a rețetelor.
      setPozaUrl(cale);
    } catch (err) {
      console.error("Eroare la urcarea pozei:", err);
      alert(
        "Nu am putut urca poza. Verifică conexiunea și încearcă din nou."
      );
      setPozaNume("");
    } finally {
      setPozaUrca(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 text-center text-gray-500">
        Se încarcă...
      </main>
    );
  }

  if (!frame) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 text-center">
        <p className="text-gray-600">Rama nu a fost găsită.</p>
        <Link href="/produse" className="mt-4 inline-block text-[#c6a253]">
          ← Înapoi la produse
        </Link>
      </main>
    );
  }

  const framePriceLei = frame.price / 100;
  const nivel = NIVELURI_LENTILE.find((n) => n.id === nivelId);
  const soare = TIPURI_SOARE.find((t) => t.id === soareId);

  const pretLentila = nivel ? nivel.pret : 0;
  const pretAlbastru = albastru ? FILTRU_ALBASTRU.pret : 0;
  const pretSoare = soare ? soare.pret : 0;
  const total = framePriceLei + pretLentila + pretAlbastru + pretSoare;

  // rețeta e completă dacă: manual (are metoda), consultație (are metoda),
  // sau poză (are metoda ȘI poza a terminat de urcat)
  const retetaGata =
    metodaReteta === "manual" ||
    metodaReteta === "consultatie" ||
    (metodaReteta === "poza" && !!pozaUrl);

  const gata = !!nivel && retetaGata;

  function adaugaInCos() {
    if (!nivel) return;
    const config = {
      frameId: id,
      lentila: { nume: nivel.nume, index: nivel.index, pret: pretLentila },
      albastru,
      albastruPret: pretAlbastru,
      soare:
        soare && soare.pret > 0
          ? { nume: soare.nume, pret: pretSoare }
          : null,
      reteta: {
        metoda: metodaReteta,
        dioptrii: metodaReteta === "manual" ? reteta : null,
        pozaCale: metodaReteta === "poza" ? pozaUrl : null,
      },
    };
    addItem({
      id: "config-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
      name: `${nivel.nume} pe ${frame.name}`,
      brand: frame.brand,
      price: Math.round(total * 100),
      image: frame.images?.[0] || frame.image || "",
      config,
    });
    router.push("/cos");
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href={`/produse/${id}`}
        className="mb-6 inline-block text-sm text-gray-500 transition hover:text-[#0a1728]"
      >
        ← Înapoi la ramă
      </Link>

      <h1 className="mb-2 text-3xl font-semibold text-[#0a1728]">
        Configurează lentilele
      </h1>
      <p className="mb-8 text-gray-600">
        Pentru rama{" "}
        <strong>
          {frame.brand} {frame.name}
        </strong>
      </p>

      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        {/* COLOANA STÂNGA — pași */}
        <div className="space-y-12">
          {/* PAS 1 — Nivel lentilă */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#0a1728]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a1728] text-sm text-[#c6a253]">
                1
              </span>
              Alege tipul de lentile
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {NIVELURI_LENTILE.map((n) => {
                const activ = n.id === nivelId;
                return (
                  <button
                    key={n.id}
                    onClick={() => setNivelId(n.id)}
                    className={`relative rounded-xl border-2 p-5 text-left transition ${
                      activ
                        ? "border-[#c6a253] bg-[#faf8f3]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {n.recomandat && (
                      <span className="absolute -top-2.5 left-4 rounded-full bg-[#c6a253] px-2 py-0.5 text-xs font-medium text-[#0a1728]">
                        Recomandat
                      </span>
                    )}
                    <div className="flex items-baseline justify-between">
                      <span className="font-semibold text-[#0a1728]">
                        {n.nume}
                      </span>
                      <span className="text-sm text-gray-400">
                        index {n.index}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{n.descriere}</p>
                    <p className="mt-3 font-semibold text-[#0a1728]">
                      {lei(n.pret)}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* PAS 2 — Filtru lumină albastră */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#0a1728]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a1728] text-sm text-[#c6a253]">
                2
              </span>
              Filtru lumină albastră
            </h2>
            <button
              onClick={() => setAlbastru(!albastru)}
              className={`flex w-full items-start justify-between rounded-xl border-2 p-5 text-left transition ${
                albastru
                  ? "border-[#c6a253] bg-[#faf8f3]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="pr-4">
                <span className="font-semibold text-[#0a1728]">
                  {FILTRU_ALBASTRU.nume}
                </span>
                <p className="mt-1 text-sm text-gray-600">
                  {FILTRU_ALBASTRU.descriere}
                </p>
              </div>
              <span className="whitespace-nowrap font-semibold text-[#0a1728]">
                + {lei(FILTRU_ALBASTRU.pret)}
              </span>
            </button>
          </section>

          {/* PAS 3 — Tip soare */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#0a1728]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a1728] text-sm text-[#c6a253]">
                3
              </span>
              Lentile la soare
            </h2>
            <div className="space-y-3">
              {TIPURI_SOARE.map((t) => {
                const activ = t.id === soareId;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSoareId(t.id)}
                    className={`flex w-full items-start justify-between rounded-xl border-2 p-5 text-left transition ${
                      activ
                        ? "border-[#c6a253] bg-[#faf8f3]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="pr-4">
                      <span className="font-semibold text-[#0a1728]">
                        {t.nume}
                      </span>
                      <p className="mt-1 text-sm text-gray-600">
                        {t.descriere}
                      </p>
                    </div>
                    <span className="whitespace-nowrap font-semibold text-[#0a1728]">
                      {t.pret > 0 ? `+ ${lei(t.pret)}` : "Inclus"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* PAS 4 — Rețeta */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#0a1728]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a1728] text-sm text-[#c6a253]">
                4
              </span>
              Rețeta ta
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              Avem nevoie de rețeta ta pentru a comanda lentilele cu dioptriile
              corecte. Alege cum vrei să ne-o transmiți:
            </p>

            <div className="space-y-3">
              {/* Opțiune: manual */}
              <button
                onClick={() => setMetodaReteta("manual")}
                className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition ${
                  metodaReteta === "manual"
                    ? "border-[#c6a253] bg-[#faf8f3]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="font-medium text-[#0a1728]">
                  Introduc dioptriile manual
                </span>
              </button>

              {metodaReteta === "manual" && (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="grid grid-cols-[auto_1fr_1fr_1fr] items-center gap-2">
                    <span></span>
                    <span className="text-center text-xs font-medium text-gray-500">
                      SPH
                    </span>
                    <span className="text-center text-xs font-medium text-gray-500">
                      CYL
                    </span>
                    <span className="text-center text-xs font-medium text-gray-500">
                      AX
                    </span>

                    <span className="text-xs font-medium text-gray-600">
                      OD (drept)
                    </span>
                    <input
                      value={reteta.odSph}
                      onChange={(e) => updateReteta("odSph", e.target.value)}
                      placeholder="-2.00"
                      className="rounded border px-2 py-1.5 text-center text-sm"
                    />
                    <input
                      value={reteta.odCyl}
                      onChange={(e) => updateReteta("odCyl", e.target.value)}
                      placeholder="-0.50"
                      className="rounded border px-2 py-1.5 text-center text-sm"
                    />
                    <input
                      value={reteta.odAx}
                      onChange={(e) => updateReteta("odAx", e.target.value)}
                      placeholder="180"
                      className="rounded border px-2 py-1.5 text-center text-sm"
                    />

                    <span className="text-xs font-medium text-gray-600">
                      OS (stâng)
                    </span>
                    <input
                      value={reteta.osSph}
                      onChange={(e) => updateReteta("osSph", e.target.value)}
                      placeholder="-2.00"
                      className="rounded border px-2 py-1.5 text-center text-sm"
                    />
                    <input
                      value={reteta.osCyl}
                      onChange={(e) => updateReteta("osCyl", e.target.value)}
                      placeholder="-0.50"
                      className="rounded border px-2 py-1.5 text-center text-sm"
                    />
                    <input
                      value={reteta.osAx}
                      onChange={(e) => updateReteta("osAx", e.target.value)}
                      placeholder="180"
                      className="rounded border px-2 py-1.5 text-center text-sm"
                    />
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">
                        PD (distanța pupilară)
                      </label>
                      <input
                        value={reteta.pd}
                        onChange={(e) => updateReteta("pd", e.target.value)}
                        placeholder="63"
                        className="w-full rounded border px-2 py-1.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">
                        ADD (adiție, opțional)
                      </label>
                      <input
                        value={reteta.add}
                        onChange={(e) => updateReteta("add", e.target.value)}
                        placeholder="+2.00"
                        className="w-full rounded border px-2 py-1.5 text-sm"
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-gray-500">
                    Valorile se confirmă telefonic înainte de comandă.
                  </p>
                </div>
              )}

              {/* Opțiune: poză */}
              <button
                onClick={() => setMetodaReteta("poza")}
                className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition ${
                  metodaReteta === "poza"
                    ? "border-[#c6a253] bg-[#faf8f3]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="font-medium text-[#0a1728]">
                  Încarc o poză cu rețeta
                </span>
              </button>

              {metodaReteta === "poza" && (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <label className="block cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-6 text-center text-sm text-gray-500 transition hover:border-[#c6a253]">
                    {pozaUrca ? (
                      <span className="font-medium text-[#0a1728]">
                        Se încarcă poza...
                      </span>
                    ) : pozaUrl ? (
                      <span className="font-medium text-green-700">
                        ✓ {pozaNume} — încărcată
                      </span>
                    ) : pozaNume ? (
                      <span className="font-medium text-[#0a1728]">
                        {pozaNume}
                      </span>
                    ) : (
                      "Apasă pentru a alege o poză cu rețeta"
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handlePoza(f);
                      }}
                    />
                  </label>
                  <p className="mt-3 text-xs text-gray-500">
                    Acceptăm o poză clară a rețetei de la medic (JPG sau PNG).
                  </p>
                </div>
              )}

              {/* Opțiune: consultație */}
              <button
                onClick={() => setMetodaReteta("consultatie")}
                className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition ${
                  metodaReteta === "consultatie"
                    ? "border-[#c6a253] bg-[#faf8f3]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="font-medium text-[#0a1728]">
                  Vreau consultație / aduc rețeta la magazin
                </span>
              </button>

              {metodaReteta === "consultatie" && (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                  Perfect! Te contactăm telefonic pentru a programa o consultație
                  optometrică sau pentru a prelua rețeta ta direct la magazin.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* COLOANA DREAPTA — sumar */}
        <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="mb-4 text-lg font-semibold text-[#0a1728]">Sumar</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Ramă — {frame.name}</span>
              <span className="font-medium">{lei(framePriceLei)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                Lentile {nivel ? `— ${nivel.nume}` : ""}
              </span>
              <span className="font-medium">
                {nivel ? lei(pretLentila) : "—"}
              </span>
            </div>
            {albastru && (
              <div className="flex justify-between">
                <span className="text-gray-600">Filtru lumină albastră</span>
                <span className="font-medium">{lei(pretAlbastru)}</span>
              </div>
            )}
            {soare && soare.pret > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">{soare.nume}</span>
                <span className="font-medium">{lei(pretSoare)}</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <span className="font-semibold text-[#0a1728]">Total</span>
            <span className="text-2xl font-bold text-[#0a1728]">
              {lei(total)}
            </span>
          </div>

          <button
            disabled={!gata}
           onClick={adaugaInCos}
            className="mt-6 w-full rounded-full bg-[#c6a253] px-8 py-3 text-sm font-medium text-[#0a1728] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {!nivel
              ? "Alege tipul de lentile"
              : !retetaGata
              ? pozaUrca
                ? "Se încarcă poza..."
                : "Completează rețeta"
              : "Adaugă în coș"}
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">
            Prețul lentilelor este orientativ și se confirmă în funcție de rețetă.
          </p>
        </aside>
      </div>
    </main>
  );
}