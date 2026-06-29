"use client";

import Link from "next/link";

const cardImages = {
  "port-vila": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
  noumea: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&h=600&fit=crop",
  lifou: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
  fiji: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=600&fit=crop",
};

export default function DestinationCard({ dest }) {
  return (
    <Link
      href={`/destinations/${dest.id}`}
      className="relative overflow-hidden rounded-2xl group h-72 shadow-sm hover:shadow-xl transition-all duration-300 block"
    >
      <img
        src={cardImages[dest.id]}
        alt={dest.port}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <h3 className="text-white font-bold text-lg leading-tight">{dest.port}</h3>
        <p className="text-white/80 text-sm mt-1">
          {dest.excursions.length} excursion{dest.excursions.length > 1 ? "s" : ""}
        </p>
      </div>
    </Link>
  );
}
