export const metadata = {
  title: "Politica de cookies | Clarivus",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white text-[#0a1728]">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-light tracking-wide">Politica de cookies</h1>
        <p className="mt-2 text-sm text-gray-500">
          Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">1. Ce folosim</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Site-ul clarivus.ro <strong>nu utilizează cookie-uri</strong>. Nu folosim
          Google Analytics, Facebook Pixel, cookie-uri de marketing sau orice alt
          mecanism de urmărire (tracking) a comportamentului dumneavoastră pe site sau
          pe alte site-uri.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">
          2. Stocare locală strict necesară
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Pentru funcționarea coșului de cumpărături, site-ul folosește{" "}
          <strong>stocarea locală a browserului (localStorage)</strong>, nu cookie-uri.
          Aceasta reține temporar, doar pe dispozitivul dumneavoastră, produsele
          adăugate în coș, astfel încât să nu le pierdeți dacă închideți sau
          reîmprospătați pagina. Aceste date:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>rămân exclusiv pe dispozitivul dumneavoastră, nu sunt trimise către noi decât în momentul în care plasați o comandă;</li>
          <li>nu conțin date personale — doar produsele selectate și configurația lor;</li>
          <li>pot fi șterse oricând din setările browserului (golirea datelor de navigare pentru acest site) sau folosind modul de navigare privată/incognito.</li>
        </ul>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Fiind strict necesară pentru funcționarea de bază a coșului de cumpărături,
          această stocare nu necesită consimțământul dumneavoastră conform legislației
          aplicabile (Legea nr. 506/2004, care transpune Directiva ePrivacy).
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">3. Fonturi</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Fonturile utilizate pe site sunt descărcate o singură dată la construirea
          site-ului și servite direct de pe serverul nostru, nu de pe serverele Google
          în timp real — deci nu generează cereri către terți și nu setează cookie-uri.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">4. Modificări viitoare</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Dacă în viitor vom introduce instrumente de analiză a traficului (ex. Google
          Analytics) sau alte tehnologii care implică cookie-uri neesențiale, această
          pagină va fi actualizată și vă vom solicita consimțământul explicit printr-un
          banner afișat la prima vizită.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">5. Contact</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Pentru întrebări legate de această politică, ne puteți contacta la{" "}
          <a href="mailto:xaioffice22@gmail.com" className="text-[#c6a253] underline">
            xaioffice22@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}