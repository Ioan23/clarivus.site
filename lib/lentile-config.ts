// app/lib/lentile-config.ts
// Configurația lentilelor pentru configurator.
// AICI modifici prețurile și opțiunile — un singur loc pentru tot.

export type NivelLentila = {
  id: string;
  nume: string;
  index: string;
  pret: number;
  descriere: string;
  recomandat?: boolean;
};

export const NIVELURI_LENTILE: NivelLentila[] = [
  {
    id: "standard",
    nume: "Standard",
    index: "1.5",
    pret: 290,
    descriere:
      "Grosime normală. Recomandate pentru dioptrii de până la ±1.75. Tratament anti-reflex standard și protecție UV.",
  },
  {
    id: "confort",
    nume: "Confort",
    index: "1.6",
    pret: 450,
    descriere:
      "Cu până la 30% mai subțiri și mai ușoare. Anti-reflex de 3× mai rezistent la zgârieturi. Se montează pe orice ramă.",
    recomandat: true,
  },
  {
    id: "premium",
    nume: "Premium",
    index: "1.67",
    pret: 790,
    descriere:
      "Cu până la 40% mai subțiri. Design asferic pentru vedere mai clară și efect redus de mărire/micșorare a ochiului.",
  },
  {
    id: "premium-plus",
    nume: "Premium+",
    index: "1.74",
    pret: 999,
    descriere:
      "Cel mai subțire design (până la 50% mai subțiri), pentru dioptrii mari. Se recomandă consult de specialitate.",
  },
];

// Filtru lumină albastră — se poate adăuga peste orice nivel
export const FILTRU_ALBASTRU = {
  id: "albastru",
  nume: "Filtru lumină albastră",
  pret: 390,
  descriere:
    "Filtrează lumina albastră nocivă de la ecrane. Vedere mai relaxată în fața dispozitivelor digitale.",
};

// Tip lentilă la soare — se alege MAXIM UNUL
export type TipSoare = {
  id: string;
  nume: string;
  pret: number;
  descriere: string;
};

export const TIPURI_SOARE: TipSoare[] = [
  {
    id: "fara",
    nume: "Fără (transparentă)",
    pret: 0,
    descriere: "Lentilă transparentă normală, pentru interior și exterior.",
  },
  {
    id: "heliomat",
    nume: "Heliomat nepolarizat",
    pret: 680,
    descriere:
      "Se închide la culoare la soare și devine transparentă în interior (fotocromatic).",
  },
  {
    id: "heliomat-polarizat",
    nume: "Heliomat polarizat",
    pret: 720,
    descriere:
      "Se închide la soare + filtru polarizant care taie reflexiile (util la volan, apă, zăpadă).",
  },
  {
    id: "polarizat",
    nume: "Polarizat",
    pret: 740,
    descriere:
      "Lentilă de soare fixă, cu filtru polarizant care taie reflexiile.",
  },
];