"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";

type Props = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  inStock: boolean;
};

export default function AddToCart({ id, name, brand, price, image, inStock }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({ id, name, brand, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (!inStock) {
    return (
      <button
        disabled
        className="mt-8 w-full cursor-not-allowed rounded-full bg-gray-200 px-8 py-4 text-sm font-medium text-gray-400"
      >
        Stoc epuizat
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="mt-8 w-full rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition hover:bg-gray-800"
    >
      {added ? "✓ Adăugat în coș" : "Adaugă în coș"}
    </button>
  );
}