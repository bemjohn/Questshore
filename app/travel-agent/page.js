import { client } from "@/lib/sanity/client";
import { TRAVEL_AGENT_QUERY, DESTINATIONS_QUERY } from "@/lib/sanity/queries";
import { mergeTravelAgentContent } from "@/lib/content/travelAgent.merge";
import { mergeDestinations } from "@/lib/content/destinations.merge";
import TravelAgentBody from "./TravelAgentBody";

export default async function TravelAgentPage() {
  const [sanityDoc, sanityDestinations] = await Promise.all([
    client.fetch(TRAVEL_AGENT_QUERY, {}, { next: { tags: ["travelAgentPage"] } }).catch(() => null),
    client.fetch(DESTINATIONS_QUERY, {}, { next: { tags: ["travelAgentPage", "destinations"] } }).catch(() => null),
  ]);
  const content = mergeTravelAgentContent(sanityDoc);
  const destinations = mergeDestinations(sanityDestinations);

  return <TravelAgentBody heroBackgroundImage={content.heroBackgroundImage} destinations={destinations} />;
}
