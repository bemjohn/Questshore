import { client, urlFor } from "@/lib/sanity";
import { travelAgentPageQuery, destinationsByRegion } from "@/lib/queries";
import TravelAgentBody from "./TravelAgentBody";

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

  const resolvedDestinations = (destinations || []).map((d) => ({
    ...d,
    image: d.image ? urlFor(d.image).width(400).height(300).url() : '',
  }));

  return <TravelAgentBody data={data} destinations={resolvedDestinations} />;
}
