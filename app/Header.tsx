"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";

function EyeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 30 Q60 5 115 30 Q60 55 5 30 Z" stroke="#c6a253" strokeWidth="3" />
      <circle cx="60" cy="30" r="15" stroke="#c6a253" strokeWidth="3" />
      <circle cx="60" cy="30" r="4.5" fill="#c6a253" />
    </svg>
  );
}

export default function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a1728]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2.5 text-white">
          <EyeLogo className="h-6 w-auto" />
          <span className="text-lg font-light tracking-[0.3em]">CLARIVUS</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/produse" className="text-gray-300 transition hover:text-[#c6a253]">
            Produse
          </Link>
          <Link href="/cos" className="relative text-gray-300 transition hover:text-[#c6a253]">
            Coș
            {count > 0 && (
              <span className="absolute -right-4 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c6a253] px-1 text-xs font-medium text-[#0a1728]">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
