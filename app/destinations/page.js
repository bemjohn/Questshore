import { client, urlFor } from "@/lib/sanity";
import { destinationsPageQuery, destinationsByRegion } from "@/lib/queries";
import Link from "next/link";

export const metadata = {
  title: "All Destinations — QuestAshore Excursions",
  description: "Explore all shore destinations. Book your adventure today.",
};

export default async function DestinationsIndexPage() {
  let page;
  let allDestinations;

  try {
    [page, allDestinations] = await Promise.all([
      client.fetch(destinationsPageQuery),
      client.fetch(destinationsByRegion, { region: "South Pacific" }),
    ]);
  } catch {
    page = null;
    allDestinations = [];
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
          {page?.eyebrow || "Destinations"}
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
          {page?.heading || "Explore Our Destinations"}
        </h1>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          {page?.subtitle || "Handpicked shore excursions across the most breathtaking ports."}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {allDestinations.map((dest) => (
          <Link
            key={dest.slug}
            href={`/destinations/${dest.slug}`}
            className="relative overflow-hidden rounded-2xl group h-72 shadow-sm hover:shadow-xl transition-all duration-300 block"
          >
            <img
              src={urlFor(dest.cardImage).width(800).height(600).url()}
              alt={dest.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white font-bold text-lg leading-tight">{dest.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
