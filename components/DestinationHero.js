"use client";

import { useRef, useEffect, useState } from "react";

export default function DestinationHero({ src, alt, port }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = ref.current?.querySelector("img");
    if (img) {
      const handler = () => setFailed(true);
      img.addEventListener("error", handler);
      return () => img.removeEventListener("error", handler);
    }
  }, []);

  return (
    <section className="relative h-72 sm:h-96 overflow-hidden" ref={ref}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div
        className={`absolute inset-0 ${failed ? "bg-slate-800" : "bg-gradient-to-t from-black/70 via-black/30 to-black/20"}`}
      />
      <div className="absolute bottom-8 sm:bottom-12 left-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg">
            {port}
          </h1>
        </div>
      </div>
    </section>
  );
}
