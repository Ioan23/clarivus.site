export const metadata = {
  title: "Politica de confidențialitate — Clarivus",
};

export default function ConfidentialitatePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-semibold">Politica de confidențialitate</h1>
      <p className="mb-8 text-sm text-gray-500">Ultima actualizare: [COMPLETEAZĂ DATA]</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">1. Operatorul de date</h2>
          <p>
            <strong>SC CLARIVUS SRL</strong>, cu sediul în [COMPLETEAZĂ ADRESA], CUI [COMPLETEAZĂ RO...],
            este operatorul datelor cu caracter personal colectate prin acest site. Ne poți contacta la
            email [COMPLETEAZĂ] sau telefon [COMPLETEAZĂ] pentru orice întrebare legată de datele tale.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">2. Ce date colectăm</h2>
          <p>Pentru procesarea comenzilor, colectăm următoarele date:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Nume și prenume</li>
            <li>Număr de telefon</li>
            <li>Adresă de email (dacă este furnizată)</li>
            <li>Adresă de livrare (județ, localitate, stradă)</li>
            <li>Detalii despre comandă (produse, cantități)</li>
            <li>Date de prescripție optică, dacă sunt furnizate pentru comenzi cu dioptrii</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">3. Scopul prelucrării</h2>
          <p>Folosim datele exclusiv pentru:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Procesarea și livrarea comenzilor</li>
            <li>Contactarea ta pentru confirmarea comenzii</li>
            <li>Emiterea documentelor fiscale (factură)</li>
            <li>Îndeplinirea obligațiilor legale</li>
            <li>Soluționarea eventualelor reclamații sau retururi</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">4. Temeiul legal</h2>
          <p>
            Prelucrarea se face în temeiul executării contractului (comanda ta), al obligațiilor legale
            (fiscale, contabile) și, unde este cazul, al consimțământului tău, conform Regulamentului (UE)
            2016/679 (GDPR).
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">5. Cui divulgăm datele</h2>
          <p>Datele pot fi transmise, strict pentru îndeplinirea comenzii, către:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Firma de curierat, pentru livrare</li>
            <li>Furnizorul de servicii de facturare / contabilul, pentru documente fiscale</li>
            <li>Furnizorii de servicii IT (găzduire, email), sub obligație de confidențialitate</li>
            <li>Autoritățile publice, când legea o impune</li>
          </ul>
          <p className="mt-2">Nu vindem și nu închiriem datele tale către terți.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">6. Cât timp păstrăm datele</h2>
          <p>
            Păstrăm datele pe durata necesară îndeplinirii scopurilor de mai sus și pe perioada impusă de
            legislația fiscală și contabilă (de regulă [COMPLETEAZĂ, ex: 10 ani pentru documente fiscale]).
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">7. Drepturile tale</h2>
          <p>Conform GDPR, ai dreptul la:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Acces la datele tale</li>
            <li>Rectificarea datelor incorecte</li>
            <li>Ștergerea datelor („dreptul de a fi uitat")</li>
            <li>Restricționarea prelucrării</li>
            <li>Portabilitatea datelor</li>
            <li>Opoziție la prelucrare</li>
            <li>Retragerea consimțământului, unde este cazul</li>
          </ul>
          <p className="mt-2">
            Pentru exercitarea acestor drepturi, ne poți scrie la [COMPLETEAZĂ EMAIL]. Ai de asemenea dreptul
            de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter
            Personal (ANSPDCP).
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">8. Cookie-uri</h2>
          <p>
            Site-ul poate folosi cookie-uri tehnice necesare funcționării (de exemplu, pentru coșul de
            cumpărături). [COMPLETEAZĂ dacă adaugi cookie-uri de analiză, ex: Google Analytics.]
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">9. Securitate</h2>
          <p>
            Aplicăm măsuri tehnice și organizatorice rezonabile pentru protejarea datelor tale împotriva
            accesului neautorizat, pierderii sau divulgării.
          </p>
        </section>
      </div>
    </main>
  );
}