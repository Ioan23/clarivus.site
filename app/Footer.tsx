import Link from "next/link";

function EyeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 30 Q60 5 115 30 Q60 55 5 30 Z" stroke="#c6a253" strokeWidth="3" />
      <circle cx="60" cy="30" r="15" stroke="#c6a253" strokeWidth="3" />
      <circle cx="60" cy="30" r="4.5" fill="#c6a253" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0a1728] text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 text-white">
              <EyeLogo className="h-6 w-auto" />
              <span className="text-lg font-light tracking-[0.3em]">CLARIVUS</span>
            </div>
            <p className="mt-3 text-xs tracking-[0.25em] text-[#c6a253]">PREMIUM EYEWEAR</p>
            <p className="mt-4 text-sm text-gray-400">
              Ochelari premium și consultații optometrice, cu grija unui optician cu experiență.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Magazin</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/produse" className="hover:text-[#c6a253]">Produse</Link></li>
              <li><Link href="/cos" className="hover:text-[#c6a253]">Coș</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Informații</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/termeni" className="hover:text-[#c6a253]">Termeni și condiții</Link></li>
              <li><Link href="/confidentialitate" className="hover:text-[#c6a253]">Politica de confidențialitate</Link></li>
              <li><Link href="/retur" className="hover:text-[#c6a253]">Politica de retur</Link></li>
              <li><Link href="/cookies" className="hover:text-[#c6a253]">Politica de cookies</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x47490b9a061d6555:0xb2cc6c5256823ffc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c6a253]"
                >
                  Showroom: Bulevardul Muncii 8, Cluj-Napoca
                </a>
              </li>
              <li>Email: xaioffice22@gmail.com</li>
              <li>Telefon: 0750 261 246</li>
              <li>
                <a href="https://www.instagram.com/clarivus" target="_blank" rel="noopener noreferrer" className="hover:text-[#c6a253]">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-gray-500">
          <p>
            XAIVISION SRL · CUI: RO46063856 · Reg. Com.: J2022002373128 · Sediu: Sat Dancu, nr. 72, jud. Cluj, cod 407008
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="hover:text-[#c6a253]">
              ANPC
            </a>
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="hover:text-[#c6a253]">
              Soluționarea online a litigiilor (SOL)
            </a>
            <span>© {new Date().getFullYear()} Clarivus. Toate drepturile rezervate.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}