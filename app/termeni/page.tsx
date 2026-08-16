export const metadata = {
  title: "Termeni și condiții — Clarivus",
};

export default function TermeniPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-semibold">Termeni și condiții</h1>
      <p className="mb-8 text-sm text-gray-500">Ultima actualizare: [COMPLETEAZĂ DATA]</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">1. Informații generale</h2>
          <p>
            Acest site este deținut și operat de <strong>SC CLARIVUS SRL</strong>, cu sediul în
            [COMPLETEAZĂ ADRESA], înregistrată la Registrul Comerțului sub nr. [COMPLETEAZĂ J.../.../...],
            CUI [COMPLETEAZĂ RO...], denumită în continuare „Vânzătorul".
            Datele de contact: email [COMPLETEAZĂ], telefon [COMPLETEAZĂ].
          </p>
          <p className="mt-2">
            Utilizarea site-ului și plasarea unei comenzi implică acceptarea prezentelor Termeni și condiții.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">2. Definiții</h2>
          <p>
            <strong>Client / Cumpărător</strong> — persoana care plasează o comandă pe site.
            <br />
            <strong>Produse</strong> — ochelari de soare, rame, lentile, lentile de contact și accesorii
            prezentate pe site.
            <br />
            <strong>Comandă</strong> — solicitarea Clientului de a achiziționa unul sau mai multe Produse.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">3. Produse și prețuri</h2>
          <p>
            Prețurile sunt exprimate în lei (RON). Vânzătorul își rezervă dreptul de a modifica prețurile
            în orice moment, fără notificare prealabilă. Prețul valabil este cel afișat la momentul plasării
            comenzii. Imaginile produselor au caracter informativ și pot diferi ușor de produsul livrat.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">4. Comanda</h2>
          <p>
            Comanda se consideră înregistrată în momentul finalizării pașilor de pe site. Vânzătorul poate
            contacta telefonic Clientul pentru confirmarea comenzii. Vânzătorul își rezervă dreptul de a anula
            o comandă în caz de indisponibilitate a produsului, erori de preț sau date de contact invalide,
            cu informarea Clientului.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">5. Plata</h2>
          <p>
            Modalitatea de plată disponibilă este <strong>ramburs</strong> (plata la livrare, către curier).
            [COMPLETEAZĂ dacă adaugi plata cu cardul.]
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">6. Livrarea</h2>
          <p>
            Livrarea se face prin curier, pe teritoriul României. Termenul estimativ de livrare este de
            [COMPLETEAZĂ, ex: 2–5 zile lucrătoare] de la confirmarea comenzii. Costul livrării este
            [COMPLETEAZĂ, ex: gratuit / X lei] și este afișat înainte de finalizarea comenzii.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">7. Dreptul de retragere (retur)</h2>
          <p>
            Conform OUG 34/2014, Clientul persoană fizică are dreptul de a se retrage din contract în termen de
            <strong> 14 zile calendaristice</strong> de la primirea produsului, fără a fi nevoit să justifice
            decizia. Detaliile complete se găsesc în <a href="/retur" className="text-[#c6a253] underline">Politica de retur</a>.
          </p>
          <p className="mt-2">
            <strong>Excepție importantă:</strong> produsele personalizate — în special ochelarii de vedere cu
            lentile montate conform prescripției/dioptriilor Clientului — sunt confecționate special pentru
            Client și <strong>nu pot fi returnate</strong>, conform art. 16 lit. c) din OUG 34/2014.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">8. Garanții</h2>
          <p>
            Produsele beneficiază de garanție conform legislației în vigoare (OUG 140/2021 privind garanția
            de conformitate). Termenul de garanție și condițiile sunt precizate pentru fiecare produs sau în
            documentele care însoțesc produsul.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">9. Produse medicale</h2>
          <p>
            Ochelarii de vedere și lentilele cu dioptrii sunt dispozitive medicale. Recomandăm efectuarea unui
            control de specialitate și utilizarea unei prescripții valide. Clientul este responsabil pentru
            corectitudinea datelor de prescripție transmise.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">10. Protecția datelor</h2>
          <p>
            Prelucrarea datelor cu caracter personal se face conform{" "}
            <a href="/confidentialitate" className="text-[#c6a253] underline">Politicii de confidențialitate</a>.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">11. Soluționarea litigiilor</h2>
          <p>
            Eventualele litigii se soluționează pe cale amiabilă. Clientul se poate adresa{" "}
            <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="text-[#c6a253] underline">ANPC</a>{" "}
            sau platformei europene de{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#c6a253] underline">Soluționare Online a Litigiilor (SOL)</a>.
          </p>
        </section>
      </div>
    </main>
  );
}       