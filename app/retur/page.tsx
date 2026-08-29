export const metadata = {
  title: "Politica de retur | Clarivus",
};

export default function ReturPage() {
  return (
    <main className="min-h-screen bg-white text-[#0a1728]">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-light tracking-wide">Politica de retur</h1>
        <p className="mt-2 text-sm text-gray-500">
          Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">1. Dreptul de retragere</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Conform OUG nr. 34/2014, aveți dreptul de a vă retrage din contract, fără a
          fi necesară justificarea deciziei, în termen de <strong>14 zile calendaristice</strong>{" "}
          de la data primirii produsului.
        </p>

        <div className="mb-6 rounded-md border-l-4 border-[#c6a253] bg-amber-50 p-4">
          <p className="text-sm leading-relaxed text-gray-800">
            <strong>Excepție — lentile pe bază de rețetă.</strong> Conform art. 16 lit. c)
            din OUG nr. 34/2014, lentilele de vedere confecționate pe baza rețetei optice
            a clientului sunt produse personalizate, realizate după specificațiile
            acestuia, și <strong>nu beneficiază de dreptul de retragere</strong>. Ramele
            de ochelari și ochelarii de soare fără lentile pe comandă rămân supuse
            dreptului de retur standard descris mai jos.
          </p>
        </div>

        <h2 className="mt-10 mb-3 text-xl font-semibold">2. Cum vă exercitați dreptul de retur</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Ne puteți notifica intenția de retur printr-un email trimis la{" "}
          <a href="mailto:xaioffice22@gmail.com" className="text-[#c6a253] underline">
            xaioffice22@gmail.com
          </a>
          , menționând numărul comenzii și produsul pe care doriți să-l returnați.
          Produsul trebuie expediat înapoi în termen de 14 zile de la comunicarea
          deciziei de retragere.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">3. Starea produsului la retur</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Produsul trebuie returnat nepurtat, nedeteriorat, în ambalajul original, cu
          toate accesoriile și eticheta atașată. Clarivus își rezervă dreptul de a
          diminua suma rambursată proporțional cu deprecierea produsului, dacă aceasta
          rezultă din manipularea sa în alt mod decât cel necesar pentru determinarea
          naturii și caracteristicilor sale.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">4. Costurile returului</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Costul transportului pentru returnarea produsului este suportat de{" "}
          <strong>client</strong>, cu excepția situației în care produsul livrat este
          <strong> defect, deteriorat sau diferit</strong> față de cel comandat — caz în
          care costul transportului de retur este suportat de Clarivus.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">5. Rambursarea</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Suma achitată va fi rambursată în termen de cel mult 14 zile de la data la
          care Clarivus este informată despre decizia de retragere sau, dacă e mai
          târziu, de la data primirii produsului returnat. Rambursarea se face prin
          transfer bancar, în contul indicat de client.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">6. Produse defecte sau neconforme</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Dacă produsul primit este defect sau nu corespunde comenzii, vă rugăm să ne
          contactați în cel mai scurt timp la{" "}
          <a href="mailto:xaioffice22@gmail.com" className="text-[#c6a253] underline">
            xaioffice22@gmail.com
          </a>
          , cu poze/descriere a problemei. Aceste situații sunt tratate prioritar,
          inclusiv pentru lentilele pe bază de rețetă, în cadrul garanției legale de
          conformitate.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">7. Model de formular de retragere</h2>
        <p className="mb-2 text-sm leading-relaxed text-gray-700">
          (se completează și trimite doar dacă doriți să vă retrageți din contract)
        </p>
        <div className="mb-4 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
          <p>Către XAIVISION SRL, xaioffice22@gmail.com</p>
          <p className="mt-2">
            Prin prezenta notific retragerea mea din contractul privind vânzarea
            următorului produs: ______________________
          </p>
          <p className="mt-2">Comandat la data: ______________________</p>
          <p className="mt-2">Numele consumatorului: ______________________</p>
          <p className="mt-2">Adresa consumatorului: ______________________</p>
          <p className="mt-2">Data: ______________________</p>
        </div>
      </div>
    </main>
  );
}   