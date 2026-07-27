import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import { DESTINATION_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { mergeSingleDestination } from "@/lib/content/destinations.merge";
import { destinationsFallback } from "@/lib/content/destinations.fallback";
import ExcursionRow from "@/components/ExcursionRow";

const regionMap = {
  "south-pacific": { label: "South Pacific", display: "SOUTH PACIFIC EXCURSIONS" },
  "caribbean": { label: "Caribbean", display: "CARIBBEAN EXCURSIONS" },
};

const regionDestinationMap = {
  "south-pacific": ["port-vila", "noumea", "lifou", "fiji"],
  "caribbean": ["roatan", "cozumel"],
};

export function generateStaticParams() {
  const params = [];
  for (const [region, slugs] of Object.entries(regionDestinationMap)) {
    for (const slug of slugs) {
      params.push({ region, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug, region } = await params;
  const fb = destinationsFallback.find((d) => d.slug === slug);
  if (!fb) return {};
  const regionLabel = regionMap[region]?.label || "";
  return {
    title: `${fb.title} — ${regionLabel} QuestAshore Excursions`,
    description: `Explore ${fb.title} shore excursions. Book your adventure today.`,
  };
}

export default async function DestinationDetailPage({ params }) {
  const { slug, region } = await params;

  const validRegion = regionMap[region];
  const fb = destinationsFallback.find((d) => d.slug === slug);
  if (!validRegion || !fb) {
    notFound();
  }

  const sanityDoc = await client
    .fetch(DESTINATION_BY_SLUG_QUERY, { slug }, { next: { tags: ["destination"] } })
    .catch(() => null);

  const dest = mergeSingleDestination(sanityDoc, fb);

  return (
    <>
      <section className="w-full min-h-[450px] relative flex items-center bg-slate-900 overflow-hidden py-16 px-6 md:px-12">
        <img
          src={dest.heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60 z-0"
        />
        <div className="bg-gradient-to-r from-black/70 via-black/30 to-transparent absolute inset-0 z-10" />
        <div className="relative z-20 max-w-5xl text-left text-white space-y-2">
          <span className="text-teal-400 text-xs font-semibold tracking-widest uppercase block">
            {validRegion.display}
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-serif tracking-tight font-normal">
            {dest.title}
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        {dest.overview && (
          <div className="pb-12 mb-12 border-b border-slate-100">
            <div className="max-w-3xl">
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8">{dest.overview}</p>
              {dest.points_of_interest && dest.points_of_interest.length > 0 && (
                <>
                  <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-3">
                    Points Of Interests
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {dest.points_of_interest.filter(p => p.trim()).map((poi) => (
                      <span
                        key={poi}
                        className="bg-slate-100 rounded-full px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        {poi}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {dest.excursions.map((excursion, idx) => (
          <ExcursionRow
            key={excursion.name + idx}
            excursion={excursion}
            destinationPort={dest.title}
          />
        ))}
      </section>
    </>
  );
}
