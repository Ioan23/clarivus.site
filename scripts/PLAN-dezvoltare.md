# CLARIVUS — Plan complet de dezvoltare

Ultima actualizare: 16 august 2026

Site: https://clarivus-web--clarivus-bd287.europe-west4.hosted.app
Stack: Next.js 16 + Firebase (Firestore, Storage, App Hosting) + Resend
Domeniu dorit: clarivus.ro

============================================================
## GATA — CE AM LUCRAT DEJA (Faza 1 - MVP)
============================================================

- [x] Catalog de produse live, cu poze
- [x] Pagina de detaliu produs (galerie foto, specificatii, stoc)
- [x] Cos de cumparaturi
- [x] Checkout cu ramburs (plata la livrare)
- [x] Comenzi salvate in Firestore
- [x] Notificari pe email la comanda noua (Resend)
- [x] Reguli de securitate Firestore corecte
- [x] Flux de adaugare produse cu 2 scripturi (import + poze)
- [x] Script import "destept" pe SKU (nu mai face duplicate)
- [x] Ghid de adaugare produse (scripts/GHID-adaugare-produse.md)
- [x] Pagina de start brandata (navy + auriu, ca pe Instagram)

============================================================
## URMEAZA — LUCRURI RAPIDE (fiecare ~1 sesiune)
============================================================

- [ ] Header + meniu brandat (navy + auriu)
- [ ] Footer cu date firma obligatorii legal in RO:
      denumire SRL, CUI, adresa, contact, ANPC, SOL (link UE),
      Termeni si conditii, Politica de confidentialitate (GDPR),
      Politica de retur, link Instagram
- [ ] Domeniul clarivus.ro (cumparare + legare la site)
- [ ] Curatat numele produsului "Cristal43020A" -> "Cristal 43020A"

============================================================
## FAZA 2 — CONFIGURATORUL DE LENTILE (inima afacerii)
============================================================

Flux:
1. Client alege rama
2. Alege tipul: soare simplu / soare cu dioptrii / vedere
3. Daca are dioptrii: introduce SPH, CYL, AX, ADD, PD
   SAU alege "programeaza consultatie la mine (Optica Mobila)"
4. Alege lentila: producator (Zeiss, Essilor, Rodenstock...),
   index de subtiere, tratamente (antireflex, blue light...)
5. SAU alege pachetul 199 / 299 lei (rama + lentile incluse)
6. Pret calculat automat

Note:
- Ofertele de lentile: liste de pret manuale in Firestore la inceput
- Integrari directe cu producatorii (API): mai tarziu
- ATENTIE TVA: rama / lentile cu dioptrie / manopera se factureaza
  pe pozitii separate (dispozitiv medical)

============================================================
## PRODUSE NOI DE VANDUT (de adaugat in timp)
============================================================

- [ ] Lentile de contact
- [ ] (eventual) Solutii intretinere, accesorii

============================================================
## SERVICII DE OFERIT PE SITE
============================================================

- [ ] Reparatii ochelari
- [ ] Sudura ochelari
- [ ] Schimb pernite (nas)
- [ ] Indreptat ochelari
- [ ] Transfer lentile in alta rama
- [ ] Montaj lentile aduse de client
- [ ] Consultatie optometrica la domiciliu (Optica Mobila)

Idee de implementare servicii:
- Pagina dedicata "Servicii" cu lista + pret/de la
- Buton "Programeaza" sau "Cere oferta" (formular simplu -> email)
- Eventual, servicii ca "produse" in cos (cu pret fix)

============================================================
## FAZA 3 — CRESTERE
============================================================

- [ ] Plata cu cardul (Stripe / Netopia mobilPay)
- [ ] Facturare automata + e-Factura (SmartBill / Oblio / FGO)
- [ ] Cont client (istoric prescriptii, comenzi)
- [ ] Ray-Ban autorizat (contact EssilorLuxottica B2B)
- [ ] Sectiune servisare / piese Ray-Ban

============================================================
## FAZA 4 — PROBA VIRTUALA (virtual try-on)
============================================================

Ce foloseste eyerim: tehnologia Fittingbox (AR, 3D, realist).

Optiuni pentru noi:
- OPTIUNEA A: Fittingbox (ca eyerim) — cel mai realist,
  abonament lunar (~49$/luna start pe Shopify), necesita
  digitizarea 3D a fiecarei rame. API pentru site custom.
- OPTIUNEA B: alternative mai ieftine (GlassOn, Auglio,
  Perfect Corp, Banuba) — de comparat.
- OPTIUNEA C: construim noi versiune de baza gratuita cu
  MediaPipe (Google) — 2D, mai putin realist, dar gratis.
  Bun ca "versiune 1" de test.

Recomandare: se ataca DUPA configurator si servicii
(alea aduc bani direct; proba virtuala e "nice to have").
Fiecare rama trebuie pregatita special (digitizare) — cost/munca.

============================================================
## IDEI VIITOARE / DE EXPLORAT
============================================================

- [ ] Masurare PD (distanta pupilara) online
- [ ] Recomandare rama dupa forma fetei
- [ ] Recenzii / testimoniale clienti
- [ ] Blog / educatie (refolosind postarile de pe Instagram)
- [ ] Newsletter
- [ ] Program de fidelitate / reduceri
