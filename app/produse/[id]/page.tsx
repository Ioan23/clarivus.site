import { getProduct } from "@/lib/products";
import { notFound } from "next/navigation";
import Gallery from "./Gallery";
import Link from "next/link";
import AddToCart from "./AddToCart";
import { formatPrice } from "@/lib/pricing";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p) notFound();

  const a = (p as any).attributes || {};

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
        <Link
        href="/produse"
        className="mb-6 inline-block text-sm text-gray-500 hover:text-black"
      >
        ← Înapoi la produse
      </Link>
      <div className="grid gap-10 md:grid-cols-2">
        <Gallery images={p.images || []} name={p.name} />

        <div>
          <p className="text-sm uppercase tracking-wide text-gray-400">{p.brand}</p>
          <h1 className="mt-1 text-2xl font-semibold">{p.name}</h1>
          <p className="mt-4 text-3xl font-bold">{formatPrice(p.price)}</p>
          <p className={`mt-2 text-sm ${p.stock > 0 ? "text-green-600" : "text-red-500"}`}>
            {p.stock > 0 ? "În stoc" : "Stoc epuizat"}
          </p>
          <AddToCart
            id={p.id}
            name={p.name}
            brand={p.brand}
            price={p.price}
            image={p.images && p.images.length > 0 ? p.images[0] : ""}
            inStock={p.stock > 0}
          />

          {p.description && <p className="mt-6 text-gray-600">{p.description}</p>}

          <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-6 text-sm">
            {a.lensWidth && <Spec label="Lățime lentilă" value={`${a.lensWidth} mm`} />}
            {a.lensHeight && <Spec label="Înălțime lentilă" value={`${a.lensHeight} mm`} />}
            {a.bridgeWidth && <Spec label="Punte nazală" value={`${a.bridgeWidth} mm`} />}
            {a.templeLength && <Spec label="Lungime braț" value={`${a.templeLength} mm`} />}
            {a.material && <Spec label="Material" value={a.material} />}
            {a.color && <Spec label="Culoare" value={a.color} />}
          </div>
        </div>
      </div>
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}