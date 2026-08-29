export const metadata = {
  title: "Politica de confidențialitate | Clarivus",
};

export default function ConfidentialitatePage() {
  return (
    <main className="min-h-screen bg-white text-[#0a1728]">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-light tracking-wide">
          Politica de confidențialitate
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">1. Operatorul de date</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Operator de date cu caracter personal este <strong>XAIVISION SRL</strong>,
          CUI 46063856, Reg. Com. J2022002373128, cu sediul în Sat Dancu, nr. 72,
          jud. Cluj, cod 407008. Pentru orice solicitare privind datele
          dumneavoastră personale, ne puteți contacta la{" "}
          <a href="mailto:xaioffice22@gmail.com" className="text-[#c6a253] underline">
            xaioffice22@gmail.com
          </a>
          .
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">2. Ce date colectăm</h2>
        <ul className="mb-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>Nume, prenume, adresă de livrare, telefon, email — la plasarea comenzii;</li>
          <li>Date privind comanda (produse, preț, mod de plată, istoric comenzi);</li>
          <li>
            Date de sănătate (rețeta optică: dioptrii, cilindru, ax) — atunci când
            configurați lentile pe bază de rețetă, fie introduse manual, fie prin
            încărcarea unei fotografii a rețetei;
          </li>
          <li>
            Date tehnice de navigare (cookie-uri) —{" "}
            <a href="/cookies" className="text-[#c6a253] underline">
              detaliate în Politica de cookies
            </a>
            .
          </li>
        </ul>

        <div className="mb-6 rounded-md border-l-4 border-[#c6a253] bg-amber-50 p-4">
          <p className="text-sm leading-relaxed text-gray-800">
            <strong>Categorie specială de date.</strong> Rețeta optică (dioptrii,
            eventuale fotografii ale rețetei) reprezintă date privind sănătatea, o
            categorie specială de date conform art. 9 din GDPR. Le colectăm{" "}
            <strong>exclusiv cu consimțământul dumneavoastră explicit</strong>, exprimat
            în momentul încărcării/introducerii acestora în configuratorul de lentile,
            și doar în scopul confecționării corecte a lentilelor comandate.
          </p>
        </div>

        <h2 className="mt-10 mb-3 text-xl font-semibold">3. Scopul prelucrării</h2>
        <ul className="mb-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>Procesarea și livrarea comenzilor;</li>
          <li>Confecționarea corectă a lentilelor pe bază de rețetă;</li>
          <li>Comunicarea cu clientul privind statusul comenzii;</li>
          <li>Îndeplinirea obligațiilor legale (financiar-contabile, garanții);</li>
          <li>Programarea consultațiilor optometrice, la cerere.</li>
        </ul>

        <h2 className="mt-10 mb-3 text-xl font-semibold">4. Temeiul legal</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Prelucrarea se realizează în temeiul: executării contractului (comanda
          plasată), consimțământului explicit (pentru datele de sănătate/rețetă) și
          obligațiilor legale ale Comerciantului (evidență financiar-contabilă).
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">5. Cât timp păstrăm datele</h2>
        <ul className="mb-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>
            <strong>Rețetele externe</strong> (introduse manual sau prin fotografie de
            către client) — se păstrează <strong>6 luni</strong> de la finalizarea
            comenzii, după care sunt șterse definitiv;
          </li>
          <li>
            <strong>Rețetele emise de Clarivus</strong> (în urma unei consultații
            optometrice proprii) — se păstrează <strong>2 ani</strong>, pentru a permite
            verificări ulterioare și continuitatea corectă a corecției optice;
          </li>
          <li>
            <strong>Datele de comandă și facturare</strong> — se păstrează conform
            termenelor legale de arhivare financiar-contabilă;
          </li>
          <li>
            Datele pot fi șterse mai devreme, la cererea expresă a clientului, conform
            secțiunii 7 de mai jos.
          </li>
        </ul>

        <h2 className="mt-10 mb-3 text-xl font-semibold">6. Cui transmitem datele</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Datele strict necesare sunt transmise către: firmele de curierat (pentru
          livrare — nume, adresă, telefon), furnizorii de servicii tehnice utilizați de
          site (Firebase/Google Cloud pentru stocare, Resend pentru email de
          notificare). Nu vindem și nu închiriem datele dumneavoastră către terți în
          scop de marketing.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">7. Drepturile dumneavoastră</h2>
        <p className="mb-2 text-sm leading-relaxed text-gray-700">
          Conform GDPR, aveți dreptul de a solicita:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>Accesul la datele personale pe care le deținem despre dumneavoastră;</li>
          <li>Rectificarea datelor incorecte sau incomplete;</li>
          <li>Ștergerea datelor (&bdquo;dreptul de a fi uitat&rdquo;);</li>
          <li>Restricționarea sau opoziția la prelucrare;</li>
          <li>Portabilitatea datelor către alt operator;</li>
          <li>
            Depunerea unei plângeri la Autoritatea Națională de Supraveghere a
            Prelucrării Datelor cu Caracter Personal (
            <a
              href="https://www.dataprotection.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c6a253] underline"
            >
              dataprotection.ro
            </a>
            ).
          </li>
        </ul>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Pentru exercitarea oricăruia dintre aceste drepturi, ne puteți contacta la{" "}
          <a href="mailto:xaioffice22@gmail.com" className="text-[#c6a253] underline">
            xaioffice22@gmail.com
          </a>
          .
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">8. Securitatea datelor</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Datele sunt stocate pe infrastructură securizată (Firebase/Google Cloud), cu
          acces restricționat. Fotografiile rețetelor sunt accesibile doar prin linkuri
          securizate, folosite exclusiv pentru procesarea comenzii.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">9. Modificări ale politicii</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Această politică poate fi actualizată periodic. Orice modificare va fi
          publicată pe această pagină, cu data ultimei actualizări afișată mai sus.
        </p>
      </div>
    </main>
  );
}