export const metadata = {
  title: "Politica de retur — Clarivus",
};

export default function ReturPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-semibold">Politica de retur</h1>
      <p className="mb-8 text-sm text-gray-500">Ultima actualizare: [COMPLETEAZĂ DATA]</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">1. Dreptul de retragere (14 zile)</h2>
          <p>
            Conform OUG 34/2014, în calitate de consumator persoană fizică, ai dreptul de a te retrage din
            contract în termen de <strong>14 zile calendaristice</strong> de la data la care intri în posesia
            produsului, fără a fi nevoit să justifici decizia și fără costuri suplimentare, cu excepția
            costurilor de returnare.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">2. Excepții — produse care NU se pot returna</h2>
          <p>
            Conform art. 16 din OUG 34/2014, dreptul de retragere NU se aplică pentru produsele
            confecționate după specificațiile Clientului sau personalizate. În cazul nostru, acest lucru
            include în special:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Ochelarii de vedere cu lentile montate conform prescripției/dioptriilor tale</strong> —
              fiind confecționați special pentru tine, nu pot fi returnați.
            </li>
            <li>Lentilele de contact desigilate, din motive de igienă și protecția sănătății.</li>
            <li>[COMPLETEAZĂ alte excepții, dacă e cazul.]</li>
          </ul>
          <p className="mt-2">
            Ochelarii de soare fără dioptrii și ramele nemodificate pot fi returnați în condițiile de mai jos.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">3. Condiții pentru retur</h2>
          <p>Pentru ca returul să fie acceptat, produsul trebuie să fie:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>În aceeași stare în care a fost primit, nefolosit și nedeteriorat</li>
            <li>Cu toate accesoriile, ambalajul original și eticheta (dacă există)</li>
            <li>Însoțit de dovada achiziției (factură / bon)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">4. Cum returnezi un produs</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Ne anunți intenția de retur la [COMPLETEAZĂ EMAIL] sau [COMPLETEAZĂ TELEFON], în termenul de 14 zile.</li>
            <li>Împachetezi produsul în siguranță, cu toate accesoriile.</li>
            <li>Trimiți produsul prin curier la adresa: [COMPLETEAZĂ ADRESA DE RETUR].</li>
            <li>După verificarea produsului, procesăm rambursarea.</li>
          </ol>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">5. Rambursarea banilor</h2>
          <p>
            Rambursăm suma achitată în termen de <strong>maximum 14 zile</strong> de la data la care am fost
            informați despre decizia ta de retragere, dar putem amâna rambursarea până la primirea produsului
            returnat. Rambursarea se face prin [COMPLETEAZĂ, ex: transfer bancar în contul indicat de tine].
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">6. Costurile de returnare</h2>
          <p>
            Costul returnării produsului este suportat de [COMPLETEAZĂ, ex: Client], cu excepția cazului în
            care produsul este defect, neconform sau a fost livrat din greșeală, situație în care costul este
            suportat de Vânzător.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">7. Produse defecte sau neconforme</h2>
          <p>
            Dacă produsul primit este defect sau nu corespunde comenzii, te rugăm să ne contactezi. Ai
            dreptul, conform OUG 140/2021, la repararea sau înlocuirea produsului, ori la reducerea prețului
            sau rambursare, în condițiile legii.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">8. Contact</h2>
          <p>
            Pentru orice întrebare legată de retururi, ne poți contacta la [COMPLETEAZĂ EMAIL] sau
            [COMPLETEAZĂ TELEFON].
          </p>
        </section>
      </div>
    </main>
  );
}   