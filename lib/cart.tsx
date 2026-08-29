"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Detaliile unei configurații de lentile (ochelari configurați).
// Prețurile de aici sunt în LEI (informativ — pentru afișare și email).
// Prețul real al produsului rămâne CartItem.price, în bani.
export type LensConfig = {
  frameId: string | null;
  doarLentile?: boolean;
  lentila: { nume: string; index: string; pret: number };
  albastru: boolean;
  albastruPret: number;
  soare: { nume: string; pret: number } | null;
  reteta: {
    metoda: string; // "manual" | "poza" | "consultatie"
    dioptrii: {
      odSph: string;
      odCyl: string;
      odAx: string;
      osSph: string;
      osCyl: string;
      osAx: string;
      pd: string;
      add: string;
    } | null;
    pozaCale: string | null;
  };
};

export type CartItem = {
  id: string;
  name: string;
  brand: string;
  price: number; // în bani
  originalPrice?: number; // prețul de listă, înainte de reducere (dacă a existat reducere)
  discountLabel?: string | null; // motivul reducerii, ex "Promoție: Ray-Ban -20%" sau "Preț redus manual"
  image: string;
  qty: number;
  config?: LensConfig; // prezent doar la ochelarii configurați
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {}
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("cart", JSON.stringify(items));
  }, [items, loaded]);

  function addItem(item: Omit<CartItem, "qty">) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQty(id: string, qty: number) {
    if (qty <= 0) return removeItem(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clear, count, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart trebuie folosit în interiorul CartProvider");
  return ctx;
}