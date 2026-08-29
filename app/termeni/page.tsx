export const metadata = {
  title: "Termeni și condiții | Clarivus",
};

export default function TermeniPage() {
  return (
    <main className="min-h-screen bg-white text-[#0a1728]">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-light tracking-wide">Termeni și condiții</h1>
        <p className="mt-2 text-sm text-gray-500">
          Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">1. Date de identificare</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Site-ul clarivus.ro este operat de <strong>XAIVISION SRL</strong>, societate cu
          răspundere limitată, cu sediul social în Sat Dancu, nr. 72, cod poștal 407008,
          județul Cluj, înregistrată la Registrul Comerțului sub nr. J2022002373128,
          având CUI 46063856 (EUID: ROONRC.J2022002373128), denumită în continuare
          &bdquo;Comerciantul&rdquo; sau &bdquo;Clarivus&rdquo;. Adresă de contact:{" "}
          <a href="mailto:xaioffice22@gmail.com" className="text-[#c6a253] underline">
            xaioffice22@gmail.com
          </a>
          , telefon 0750 261 246. Showroom: Bulevardul Muncii 8, Cluj-Napoca.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">2. Obiectul contractului</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Prezentul document reglementează termenii și condițiile de utilizare a
          site-ului clarivus.ro și de achiziționare a produselor comercializate prin
          intermediul acestuia (rame de ochelari, lentile de vedere, lentile de soare,
          servicii de configurare optică). Plasarea unei comenzi implică acceptarea
          integrală a prezentelor termeni.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">3. Produse și prețuri</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Prețurile afișate pe site sunt exprimate în lei (RON). XAIVISION SRL este
          neplătitoare de TVA conform art. 310 din Codul Fiscal (regim special de
          scutire pentru întreprinderile mici), motiv pentru care prețurile afișate
          <strong> nu includ TVA</strong>. Comerciantul își rezervă dreptul de a modifica
          prețurile fără notificare prealabilă, modificările neafectând comenzile deja
          confirmate.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">4. Plasarea comenzii</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Comanda se consideră finalizată în momentul confirmării acesteia prin site și
          al primirii unui email de confirmare din partea Clarivus. Pentru produsele
          personalizate (lentile pe bază de rețetă), clientul are obligația de a furniza
          date corecte și complete privind prescripția optică — Comerciantul nu își
          asumă răspunderea pentru erori rezultate din date incorecte furnizate de
          client.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">5. Plata</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Plata comenzilor se realizează în prezent prin{" "}
          <strong>ramburs (plată la curier, în momentul livrării)</strong>. Comerciantul
          își rezervă dreptul de a introduce metode suplimentare de plată (ex. plată
          online cu cardul), caz în care acestea vor fi afișate explicit la finalizarea
          comenzii.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">6. Livrarea</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Livrarea se efectuează prin curier rapid (Cargus, Sameday, FAN Courier) sau
          prin Poșta Română, în funcție de opțiunea disponibilă la momentul comenzii.
          Termenul estimativ de livrare este de 2–5 zile lucrătoare pentru produsele
          din stoc, respectiv 7–14 zile lucrătoare pentru lentilele confecționate pe
          bază de rețetă. Termenele sunt orientative și pot varia în funcție de curier.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">
          7. Produse personalizate — excepție de la dreptul de retur
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Conform art. 16 lit. c) din OUG nr. 34/2014, lentilele de vedere confecționate
          pe baza rețetei optice a clientului sunt produse personalizate, fabricate
          după specificațiile acestuia, și <strong>nu fac obiectul dreptului de retragere</strong>{" "}
          de 14 zile. Detalii complete în{" "}
          <a href="/retur" className="text-[#c6a253] underline">
            Politica de retur
          </a>
          .
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">8. Garanție și conformitate</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Produsele comercializate beneficiază de garanția legală de conformitate
          prevăzută de Legea nr. 296/2004 privind Codul consumului și de legislația
          aplicabilă în vigoare. Orice defect de fabricație sesizat va fi analizat și
          soluționat prin înlocuire, reparare sau restituire, după caz.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">9. Limitarea răspunderii</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Clarivus nu răspunde pentru eventuale întârzieri sau imposibilitatea livrării
          cauzate de curier sau de furnizarea unor date de contact/livrare incorecte de
          către client. Configuratorul de lentile oferă o estimare pe baza datelor
          introduse de client; pentru rețete complexe, recomandăm consultația
          optometrică în showroom.
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">10. Soluționarea litigiilor</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Eventualele reclamații pot fi adresate direct Comerciantului, la adresa de
          email de mai sus. În cazul în care disputa nu se soluționează amiabil,
          consumatorul se poate adresa Autorității Naționale pentru Protecția
          Consumatorilor (
          <a
            href="https://anpc.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c6a253] underline"
          >
            anpc.ro
          </a>
          ) sau platformei europene de soluționare online a litigiilor (
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c6a253] underline"
          >
            ec.europa.eu/consumers/odr
          </a>
          ).
        </p>

        <h2 className="mt-10 mb-3 text-xl font-semibold">11. Dispoziții finale</h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Prezentul document poate fi actualizat periodic. Varianta aplicabilă este cea
          publicată pe site la momentul plasării comenzii. Prelucrarea datelor cu
          caracter personal este detaliată în{" "}
          <a href="/confidentialitate" className="text-[#c6a253] underline">
            Politica de confidențialitate
          </a>
          .
        </p>
      </div>
    </main>
  );
}