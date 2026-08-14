import { readFileSync } from "node:fs";
import { parse } from "csv-parse/sync";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  readFileSync("./scripts/serviceAccountKey.json", "utf8")
);
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const csv = readFileSync("./scripts/products.csv", "utf8");
const firstLine = csv.split(/\r?\n/)[0];
const delimiter = firstLine.includes(";") ? ";" : ",";
const rows = parse(csv, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  bom: true,
  delimiter,
});
console.log("Coloane detectate:", Object.keys(rows[0] || {}));

function slugify(s) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

let count = 0;
for (const row of rows) {
  const type = row.type;
  const doc = {
    slug: slugify(`${row.name}-${row.color || ""}`),
    name: row.name,
    brand: row.brand || "",
    type,
    category: type === "sunglasses" ? "ochelari-soare" : "rame",
    gender: row.gender || "unisex",
    price: Math.round(parseFloat(row.price) * 100),
    currency: "RON",
    vatCategory: type === "sunglasses" ? "sunglasses" : "frame",
    stock: parseInt(row.stock || "0", 10),
    sku: row.sku || "",
    images: [],
    attributes: {
      color: row.color || "",
      material: row.material || "",
      lensWidth: row.lensWidth ? parseInt(row.lensWidth, 10) : null,
      lensHeight: row.lensHeight ? parseFloat(row.lensHeight) : null,
      bridgeWidth: row.bridgeWidth ? parseInt(row.bridgeWidth, 10) : null,
      templeLength: row.templeLength ? parseInt(row.templeLength, 10) : null,
    },
    description: row.description || "",
    active: true,
    createdAt: new Date(),
  };
  await db.collection("products").add(doc);
  count++;
  console.log(`✓ ${row.name}`);
}
console.log(`\nGata: ${count} produse importate.`);
process.exit(0);    