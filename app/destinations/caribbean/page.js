import Link from "next/link";
import SiteHero from "@/components/SiteHero";
import SearchForm from "@/components/SearchForm";
import { client } from "@/lib/sanity";
import { regionPageBySlug, destinationsByRegion } from "@/lib/queries";

const fallback = {
  backgroundImage: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1920&q=80",
  title: "Customised Destination Experiences You don't want to miss out on!",
  overlayOpacity: 30,
};

export default async function CaribbeanPage() {
  let page;
  let destinations;

  try {
    [page, destinations] = await Promise.all([
      client.fetch(regionPageBySlug, { region: "caribbean" }),
      client.fetch(destinationsByRegion, { region: "Caribbean" }),
    ]);
  } catch {
    page = null;
    destinations = [];
  }

  const hero = page?.hero ?? fallback;

  return (
    <>
      <SiteHero
        backgroundImage={hero.backgroundImage || fallback.backgroundImage}
        mobileBackgroundImage={hero.mobileBackgroundImage}
        title={hero.title || fallback.title}
        subtitle={hero.subtitle || fallback.subtitle}
        accentText={hero.accentText}
        overlayOpacity={hero.overlayOpacity ?? fallback.overlayOpacity}
      />
      {hero.showSearch && (
        <div className="-mt-16 relative z-30 max-w-3xl mx-auto px-4">
          <SearchForm />
        </div>
      )}

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {destinations.map((loc) => (
          <Link
            key={loc.slug}
            href={`/destinations/caribbean/${loc.slug}`}
            className="relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer group shadow-md bg-slate-800 transition-all duration-300 hover:scale-[1.01] block"
          >
            <img
              src={loc.image}
              alt={loc.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60 mix-blend-multiply"
            />
            <div className="absolute top-4 left-4 flex gap-2 z-20">
              {(loc.badges || []).map((badge) => (
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
