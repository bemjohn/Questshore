import { client, urlFor } from "@/lib/sanity";
import { destinationBySlug, allDestinationSlugs } from "@/lib/queries";
import ExcursionCard from "@/components/ExcursionCard";
import DestinationHero from "@/components/DestinationHero";

const fallbackDestinations = {
  fiji: {
    title: "Fiji",
    slug: "fiji",
    heroImage: "https://images.unsplash.com/photo-1507876466758-bc54f384809c?auto=format&fit=crop&w=1920&q=80",
    overview: "Discover the pristine beaches and crystal-clear waters of Fiji. From vibrant coral reefs to lush rainforests, Fiji offers an unforgettable tropical paradise experience for every cruiser.",
    pointsOfInterest: ["Port Denarau", "Suva", "Yasawa Islands", "Coral Coast"],
    excursions: [
      { name: "Island Day Escape", image: null, description: "Spend a day on a private island paradise with white sand beaches and turquoise lagoons.", highlights: ["Snorkeling", "Beach BBQ", "Kayaking"], adultPrice: 189, childPrice: 95 },
      { name: "Culture & Village Tour", image: null, description: "Immerse yourself in Fijian culture with a visit to a traditional village.", highlights: ["Kava Ceremony", "Weaving Demo", "Local Lunch"], adultPrice: 129, childPrice: 65 },
    ],
  },
  lifou: {
    title: "Lifou",
    slug: "lifou",
    heroImage: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=1920&q=80",
    overview: "Lifou is the largest of the Loyalty Islands, offering dramatic limestone cliffs, hidden coves, and a rich Kanak culture waiting to be explored.",
    pointsOfInterest: ["Jokin Cliffs", "Vanilla Plantations", "Luengoni Beach", "Notre-Dame de Lourdes"],
    excursions: [
      { name: "Snorkel Paradise", image: null, description: "Explore the vibrant marine life at Lifou's famous natural aquarium.", highlights: ["Coral Gardens", "Tropical Fish", "Sea Turtles"], adultPrice: 99, childPrice: 50 },
    ],
  },
  noumea: {
    title: "Noumea",
    slug: "noumea",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    overview: "The cosmopolitan capital of New Caledonia blends French elegance with Melanesian charm. Stroll through markets, relax on stunning beaches, or explore the vibrant coral reefs.",
    pointsOfInterest: ["Tjibaou Cultural Centre", "Anse Vata Beach", "Aquarium des Lagons", "Duck Island"],
    excursions: [
      { name: "City & Beach Combo", image: null, description: "Discover Noumea's French-colonial architecture then relax on Anse Vata beach.", highlights: ["City Tour", "Beach Time", "French Pastry Tasting"], adultPrice: 79, childPrice: 40 },
    ],
  },
  "port-vila": {
    title: "Port Vila",
    slug: "port-vila",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    overview: "Port Vila, the capital of Vanuatu, is a vibrant harbor town set around a beautiful natural harbour. Experience volcanic landscapes, cascading waterfalls, and warm Melanesian hospitality.",
    pointsOfInterest: ["Mele Cascades", "Hideaway Island", "Ekasup Cultural Village", "Vanuatu National Museum"],
    excursions: [
      { name: "Waterfall & Blue Lagoon", image: null, description: "Visit stunning waterfalls and swim in the famous Blue Lagoon.", highlights: ["Mele Cascades", "Blue Lagoon Swim", "Tropical Garden"], adultPrice: 139, childPrice: 70 },
    ],
  },
  cozumel: {
    title: "Cozumel",
    slug: "cozumel",
    heroImage: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1920&q=80",
    overview: "Cozumel is a Caribbean paradise renowned for its world-class scuba diving, ancient Mayan ruins, and pristine white-sand beaches.",
    pointsOfInterest: ["Chankanaab Park", "San Gervasio Ruins", "Palancar Reef", "Punta Sur"],
    excursions: [
      { name: "Mayan Ruins & Beach", image: null, description: "Explore ancient Mayan ruins then relax on a pristine Caribbean beach.", highlights: ["San Gervasio", "Beach Club", "Snorkel Gear"], adultPrice: 119, childPrice: 60 },
    ],
  },
  roatan: {
    title: "Roatán",
    slug: "roatan",
    heroImage: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1920&q=80",
    overview: "Roatán is the largest of Honduras's Bay Islands, famous for its massive barrier reef, white sand beaches, and lush jungle-covered hills.",
    pointsOfInterest: ["West Bay Beach", "Gumbalimba Park", "Carambola Gardens", "Half Moon Bay"],
    excursions: [
      { name: "Reef Snorkel & Beach", image: null, description: "Snorkel the second-largest barrier reef in the world.", highlights: ["Coral Reef", "West Bay Beach", "Lunch Included"], adultPrice: 109, childPrice: 55 },
    ],
  },
};

const genericFallback = {
  title: "Destination",
  slug: "",
  heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
  overview: "Discover incredible shore excursions at this stunning port of call.",
  pointsOfInterest: [],
  excursions: [],
};

export async function generateStaticParams() {
  let slugs;
  try {
    slugs = await client.fetch(allDestinationSlugs);
  } catch {
    slugs = [];
  }
  return slugs.map((s) => ({ id: s.slug }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  let dest;
  try {
    dest = await client.fetch(destinationBySlug, { slug: id });
  } catch {
    dest = null;
  }
  const fallback = fallbackDestinations[id] || genericFallback;
  const title = dest?.title || fallback.title;
  return {
    title: `${title} — QuestAshore Excursions`,
    description: `Explore ${title} shore excursions. Book your adventure today.`,
  };
}

export default async function DestinationPage({ params }) {
  const { id } = await params;
  let sanity;

  try {
    sanity = await client.fetch(destinationBySlug, { slug: id });
  } catch {
    sanity = null;
  }

  const fallback = fallbackDestinations[id] || genericFallback;

  const title = sanity?.title || fallback.title;
  const slug = sanity?.slug || fallback.slug;
  const heroImage = sanity?.heroImage
    ? urlFor(sanity.heroImage).width(1920).height(800).url()
    : fallback.heroImage;
  const overview = sanity?.overview || fallback.overview;
  const pointsOfInterest = sanity?.pointsOfInterest?.length
    ? sanity.pointsOfInterest
    : fallback.pointsOfInterest;
  const excursions = sanity?.excursions?.length
    ? sanity.excursions
    : fallback.excursions;

  return (
    <>
      <DestinationHero
        src={heroImage}
        alt={title}
        port={title}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {overview && (
          <div className="mb-12 max-w-3xl">
            <p className="text-gray-600 leading-relaxed">{overview}</p>
            {pointsOfInterest.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {pointsOfInterest.map((poi) => (
                  <span
                    key={poi}
                    className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-medium text-amber-700"
                  >
                    {poi}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {excursions.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Available Excursions
              <span className="text-gray-400 font-normal text-lg ml-2">
                ({excursions.length})
              </span>
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {excursions.map((excursion, idx) => (
                <ExcursionCard
                  key={idx}
                  excursion={excursion}
                  destinationPort={title}
                  destinationId={slug}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Excursions Coming Soon</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We&apos;re curating incredible experiences for {title.split(",")[0]}. Check back soon or contact us for early access.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
