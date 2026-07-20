import Link from "next/link";
import SiteHero from "@/components/SiteHero";
import SearchForm from "@/components/SearchForm";
import { client, urlFor } from "@/lib/sanity";
import { regionPageBySlug } from "@/lib/queries";

const fallbackHero = {
  backgroundImage: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1920&q=80",
  title: "Customised Destination Experiences You don't want to miss out on!",
  subtitle: "Handpicked Caribbean shore excursions for an unforgettable cruise experience.",
  overlayOpacity: 30,
};

const fallbackDestinations = [
  { title: "Cozumel", slug: "cozumel", cardImage: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=800&h=500&q=80", badges: ["Popular"] },
  { title: "Roatán", slug: "roatan", cardImage: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=800&h=500&q=80", badges: [] },
];

export default async function CaribbeanPage() {
  let page;

  try {
    page = await client.fetch(regionPageBySlug, { region: "caribbean" });
  } catch {
    page = null;
  }

  const hero = page?.hero ?? fallbackHero;
  const destinations = page?.featuredDestinations ?? fallbackDestinations;

  return (
    <>
      <SiteHero
        backgroundImage={hero.backgroundImage || fallbackHero.backgroundImage}
        mobileBackgroundImage={hero.mobileBackgroundImage}
        title={hero.title || fallbackHero.title}
        subtitle={hero.subtitle || fallbackHero.subtitle}
        accentText={hero.accentText}
        overlayOpacity={hero.overlayOpacity ?? fallbackHero.overlayOpacity}
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
              src={typeof loc.cardImage === 'string' ? loc.cardImage : urlFor(loc.cardImage).width(800).height(500).url()}
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
