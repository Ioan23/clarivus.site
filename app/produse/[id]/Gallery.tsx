"use client";

import { useState } from "react";

export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-gray-100">
        <span className="text-gray-400">Fără imagine</span>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        {images.map((url, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={url}
            alt={`${name} ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-16 w-16 cursor-pointer rounded-lg border object-cover transition ${
              i === active ? "ring-2 ring-black" : "opacity-70 hover:opacity-100"
            }`}
          />
        ))}
      </div>
      <div className="flex aspect-square flex-1 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[active]} alt={name} className="h-full w-full object-contain" />
      </div>
    </div>
  );
}