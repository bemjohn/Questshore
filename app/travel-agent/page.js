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

  return <TravelAgentBody data={data} destinations={destinations} urlFor={urlFor} />;
}
