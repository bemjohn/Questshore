import { client, urlFor } from "@/lib/sanity";
import { travelAgentPageQuery, destinationsByRegion } from "@/lib/queries";
import TravelAgentBody from "./TravelAgentBody";

const fallbackDestinations = [
  { title: "Fiji", slug: "fiji", cardImage: "https://images.unsplash.com/photo-1507876466758-bc54f384809c?auto=format&fit=crop&w=400&h=300&q=80" },
  { title: "Lifou", slug: "lifou", cardImage: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=400&h=300&q=80" },
  { title: "Noumea", slug: "noumea", cardImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=300&q=80" },
  { title: "Port Vila", slug: "port-vila", cardImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=300&q=80" },
];

export default async function TravelAgentPage() {
  let data;
  let destinations;

  try {
    [data, destinations] = await Promise.all([
      client.fetch(travelAgentPageQuery),
      client.fetch(destinationsByRegion, { region: "South Pacific" }),
    ]);
  } catch {
    data = null;
    destinations = [];
  }

  const resolvedDestinations = (destinations.length ? destinations : fallbackDestinations).map((d) => ({
    ...d,
    image: d.cardImage
      ? typeof d.cardImage === 'string'
        ? d.cardImage
        : urlFor(d.cardImage).width(400).height(300).url()
      : '',
  }));

  return <TravelAgentBody data={data} destinations={resolvedDestinations} />;
}
