import Link from "next/link";
import SiteHero from "@/components/SiteHero";
import { client } from "@/lib/sanity";
import { heroByPage } from "@/lib/queries";

const locations = [
  {
    id: "roatan",
    title: "Roatan, Honduras",
    badges: ["Adventure", "Wildlife", "Beach"],
    image:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b3f8d1c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cozumel",
    title: "Cozumel, Mexico",
    badges: ["Marine", "History", "Culture"],
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80",
  },
];

const fallback = {
  backgroundImage: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1920&q=80",
  title: "Customised Destination Experiences You don't want to miss out on!",
  overlayOpacity: 30,
};

export default async function CaribbeanPage() {
  let hero;

  try {
    hero = await client.fetch(heroByPage, { page: "caribbean" });
  } catch {
    hero = null;
  }

  const data = hero ?? fallback;

  return (
    <>
      <SiteHero
        backgroundImage={data.backgroundImage || fallback.backgroundImage}
        title={data.title || fallback.title}
        overlayOpacity={data.overlayOpacity ?? fallback.overlayOpacity}
      />

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {locations.map((loc) => (
          <Link
            key={loc.id}
            href={`/destinations/caribbean/${loc.id}`}
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
