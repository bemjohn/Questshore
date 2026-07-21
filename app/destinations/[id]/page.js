import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import { DESTINATIONS_QUERY, DESTINATION_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { mergeDestinations, mergeSingleDestination } from "@/lib/content/destinations.merge";
import { destinationsFallback } from "@/lib/content/destinations.fallback";
import ExcursionCard from "@/components/ExcursionCard";
import DestinationHero from "@/components/DestinationHero";

export async function generateStaticParams() {
  const sanityDocs = await client.fetch(DESTINATIONS_QUERY).catch(() => null);
  const destinations = mergeDestinations(sanityDocs);
  return destinations.map((dest) => ({ id: dest.slug }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const sanityDoc = await client.fetch(DESTINATION_BY_SLUG_QUERY, { slug: id }).catch(() => null);
  const fb = destinationsFallback.find((d) => d.slug === id) || destinationsFallback[0];
  const dest = mergeSingleDestination(sanityDoc, fb);
  return {
    title: `${dest.title} — QuestAshore Excursions`,
    description: `Explore ${dest.title} shore excursions. Book your adventure today.`,
  };
}

export default async function DestinationPage({ params }) {
  const { id } = await params;
  const sanityDoc = await client.fetch(DESTINATION_BY_SLUG_QUERY, { slug: id }).catch(() => null);
  const fb = destinationsFallback.find((d) => d.slug === id);

  if (!fb) {
    notFound();
  }

  const dest = mergeSingleDestination(sanityDoc, fb);

  return (
    <>
      <DestinationHero
        src={dest.heroImage}
        alt={dest.title}
        port={dest.title}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {dest.overview && (
          <div className="mb-12 max-w-3xl">
            <p className="text-gray-600 leading-relaxed">{dest.overview}</p>
            {dest.points_of_interest && dest.points_of_interest.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {dest.points_of_interest.map((poi) => (
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

        {dest.excursions.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Available Excursions
              <span className="text-gray-400 font-normal text-lg ml-2">
                ({dest.excursions.length})
              </span>
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dest.excursions.map((excursion, idx) => (
                <ExcursionCard
                  key={idx}
                  excursion={excursion}
                  destinationPort={dest.title}
                  destinationId={dest.slug}
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
              We&apos;re curating incredible experiences for {dest.title.split(",")[0]}. Check back soon or contact us for early access.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
