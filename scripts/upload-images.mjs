import { readFileSync, readdirSync } from "node:fs";
import { extname, basename, join } from "node:path";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const serviceAccount = JSON.parse(
  readFileSync("./scripts/serviceAccountKey.json", "utf8")
);
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "clarivus-bd287.firebasestorage.app",
});

const db = getFirestore();
const bucket = getStorage().bucket();
const imagesDir = "./scripts/images";

// "RB3025-2.jpg" -> SKU "RB3025", index 2 ; "RB3025.jpg" -> SKU "RB3025", index 0
function skuOf(file) {
  const raw = basename(file, extname(file));
  const m = raw.match(/^(.*?)-(\d+)$/);
  return m ? m[1] : raw;
}
function idxOf(file) {
  const raw = basename(file, extname(file));
  const m = raw.match(/^(.*?)-(\d+)$/);
  return m ? parseInt(m[2], 10) : 0;
}

const files = readdirSync(imagesDir)
  .filter((f) => [".jpg", ".jpeg", ".png", ".webp"].includes(extname(f).toLowerCase()))
  .sort((a, b) => {
    const sa = skuOf(a), sb = skuOf(b);
    return sa === sb ? idxOf(a) - idxOf(b) : sa.localeCompare(sb);
  });

// grupează pozele pe SKU
const bySku = new Map();
for (const file of files) {
  const sku = skuOf(file);
  if (!bySku.has(sku)) bySku.set(sku, []);
  bySku.get(sku).push(file);
}

let ok = 0, skip = 0;
for (const [sku, skuFiles] of bySku) {
  const snap = await db.collection("products").where("sku", "==", sku).get();
  if (snap.empty) {
    console.log(`⚠ Niciun produs cu SKU "${sku}" — sar peste`);
    skip++;
    continue;
  }
  const urls = [];
  for (const file of skuFiles) {
    const dest = `products/${file}`;
    await bucket.upload(join(imagesDir, file), {
      destination: dest,
      metadata: { cacheControl: "public, max-age=31536000" },
    });
    await bucket.file(dest).makePublic();
    urls.push(`https://storage.googleapis.com/${bucket.name}/${dest}`);
    console.log(`  ✓ ${file}`);
  }
  await snap.docs[0].ref.update({ images: urls });
  console.log(`→ ${sku}: ${urls.length} poze legate`);
  ok += urls.length;
}

console.log(`\nGata: ${ok} poze, ${skip} SKU-uri sărite.`);
process.exit(0);