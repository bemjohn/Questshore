import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/data/excursions";

export const metadata = {
  title: "All Destinations — QuestAshore Excursions",
  description: "Explore all South Pacific shore destinations. Book your adventure today.",
};

export default function DestinationsIndexPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
          Destinations
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
          Explore Our Destinations
        </h1>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          Handpicked shore excursions across the most breathtaking South Pacific ports.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest) => (
          <DestinationCard key={dest.id} dest={dest} />
        ))}
      </div>
    </section>
  );
}
