import { client, urlFor } from "@/lib/sanity";
import { affiliateNetworkPageQuery, destinationsByRegion } from "@/lib/queries";
import AffiliateNetworkBody from "./AffiliateNetworkBody";

const fallbackDestinations = [
  { title: "Fiji", slug: "fiji", image: "https://images.unsplash.com/photo-1507876466758-bc54f384809c?auto=format&fit=crop&w=400&h=300&q=80" },
  { title: "Lifou", slug: "lifou", image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=400&h=300&q=80" },
  { title: "Noumea", slug: "noumea", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=300&q=80" },
  { title: "Port Vila", slug: "port-vila", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=300&q=80" },
];

export default async function AffiliateNetworkPage() {
  let data;
  let destinations;

  try {
    [data, destinations] = await Promise.all([
      client.fetch(affiliateNetworkPageQuery),
      client.fetch(destinationsByRegion, { region: "South Pacific" }),
    ]);
  } catch {
    data = null;
    destinations = [];
  }

  const resolvedDestinations = destinations.length
    ? destinations.map((d) => ({
        ...d,
        image: d.cardImage
          ? typeof d.cardImage === 'string'
            ? d.cardImage
            : urlFor(d.cardImage).width(400).height(300).url()
          : '',
      }))
    : fallbackDestinations;

  return <AffiliateNetworkBody data={data} destinations={resolvedDestinations} />;
}
