import Link from "next/link";
import SiteHero from "@/components/SiteHero";
import SearchForm from "@/components/SearchForm";
import { client } from "@/lib/sanity";
import { heroByPage } from "@/lib/queries";

const locations = [
  {
    id: "port-vila",
    title: "Port Vila, Vanuatu",
    badges: ["Adventure", "Culture", "Islands"],
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "noumea",
    title: "Noumea, New Caledonia",
    badges: ["Marine", "Wildlife"],
    image:
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lifou",
    title: "Lifou, New Caledonia",
    badges: ["Scenic", "Heritage", "Beach"],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fiji",
    title: "Fiji Islands",
    badges: ["Culture", "Nature", "Relaxation"],
    image:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80",
  },
];

const fallback = {
  backgroundImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
  title: "Did your itinerary say South Pacific?",
  subtitle: "Make your time ashore worthwhile with our bucket list experiences",
  overlayOpacity: 30,
};

export default async function SouthPacificPage() {
  let hero;

  try {
    hero = await client.fetch(heroByPage, { page: "south-pacific" });
  } catch {
    hero = null;
  }

  const data = hero ?? fallback;

  return (
    <>
      <SiteHero
        backgroundImage={data.backgroundImage || fallback.backgroundImage}
        mobileBackgroundImage={data.mobileBackgroundImage}
        title={data.title || fallback.title}
        subtitle={data.subtitle || fallback.subtitle}
        accentText={data.accentText}
        overlayOpacity={data.overlayOpacity ?? fallback.overlayOpacity}
      />
      {data.showSearch && (
        <div className="-mt-16 relative z-30 max-w-3xl mx-auto px-4">
          <SearchForm />
        </div>
      )}

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {locations.map((loc) => (
          <Link
            key={loc.id}
            href={`/destinations/south-pacific/${loc.id}`}
            className="relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer group shadow-md bg-slate-800 transition-all duration-300 hover:scale-[1.01] block"
          >
            <img
              src={loc.image}
              alt={loc.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60 mix-blend-multiply"
            />
            <div className="absolute top-4 left-4 flex gap-2 z-20">
              {loc.badges.map((badge) => (
                <span
                  key={badge}
                  className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide border border-white/10"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-left text-white z-20">
              <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
                {loc.title}
              </h2>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
