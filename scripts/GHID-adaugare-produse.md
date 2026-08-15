# Cum adaug produse noi pe Clarivus

Ghid pas cu pas. Toate comenzile se rulează în PowerShell,
din folderul proiectului: C:\Users\popes\clarivus

------------------------------------------------------------

## Pasul 1 — Adaug produsul in CSV

Deschid fisierul:  scripts\products.csv

Adaug un rand nou pentru fiecare produs.
- Coloanele sunt separate prin ;  (punct si virgula)
- SKU-ul trebuie sa fie UNIC (nu se repeta la alt produs)
- Pretul se scrie in lei intregi (ex: 850, nu 850.00)

Ordinea coloanelor:
name;brand;type;gender;price;stock;sku;color;material;lensWidth;lensHeight;bridgeWidth;templeLength;description

type poate fi:  sunglasses  (ochelari de soare)  sau  frame  (rame)

------------------------------------------------------------

## Pasul 2 — Pun pozele

Pun pozele in folderul:  scripts\images

IMPORTANT: numele pozei = exact SKU-ul produsului.
- Poza principala:  SKU.jpg          (ex: 43020A.jpg)
- A doua poza:      SKU-1.jpg        (ex: 43020A-1.jpg)
- A treia poza:     SKU-2.jpg        (ex: 43020A-2.jpg)

------------------------------------------------------------

## Pasul 3 — Bag produsele in baza de date

Rulez:

    node scripts/import-products.mjs

Trebuie sa vad la final ceva de genul:
    Gata: 1 create, 3 actualizate, 0 sarite.

Scriptul e destept: produsele care exista deja NU se dubleaza,
doar se actualizeaza. Cele noi se creeaza.

------------------------------------------------------------

## Pasul 4 — Urc pozele si le leg de produse

Rulez:

    node scripts/upload-images.mjs

Trebuie sa vad pentru fiecare SKU:
    -> SKU: 3 poze legate
Si la final:
    Gata: N poze, 0 SKU-uri sarite.

Daca vad "Niciun produs cu SKU ... — sar peste",
inseamna ca numele pozei nu se potriveste cu SKU-ul din CSV.

------------------------------------------------------------

## Gata!

Produsele apar automat pe site-ul live in cateva secunde.
NU e nevoie de git push sau rebuild pentru produse noi —
datele stau in cloud (Firestore), separat de codul aplicatiei.

Verific live in fereastra incognito:
https://clarivus-web--clarivus-bd287.europe-west4.hosted.app/produse

------------------------------------------------------------

## Daca ceva nu merge

- Produsul nu apare?  -> am rulat scriptul de la Pasul 3?
- Poza nu apare?      -> numele pozei e EXACT ca SKU-ul? am rulat Pasul 4?
- Vreau sa sterg un produs? -> Firebase Console -> Firestore Database
  -> products -> click pe produs -> Delete documentSet-Content -Path .\scripts\GHID-adaugare-produse.md -Value (Get-Clipboard) -Encoding UTF8
