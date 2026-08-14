import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center px-4 text-center">
      <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-400">
        Optica - Clarivus
      </p>

      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Vezi bine. Arata bine.
      </h1>

      <p className="mt-5 max-w-xl text-lg text-gray-600">
        Rame, ochelari de soare si lentile de la producatori de top. Consultatie
        optometrica profesionala si servisare pentru ochelarii tai.
      </p>

<div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/produse"
          className="rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Vezi produsele
        </Link>
        <a
          href="#"
          className="rounded-full border border-gray-300 px-8 py-3 text-sm font-medium text-gray-900 transition hover:border-gray-900"
        >
          Programeaza consultatie
        </a>
      </div>    </main>
  );
}