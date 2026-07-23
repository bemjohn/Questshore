import { client } from "@/lib/sanity/client";
import { TRAVEL_AGENT_QUERY } from "@/lib/sanity/queries";
import { mergeTravelAgentContent } from "@/lib/content/travelAgent.merge";
import TravelAgentBody from "./TravelAgentBody";

export default async function TravelAgentPage() {
  const sanityDoc = await client.fetch(TRAVEL_AGENT_QUERY, {}, { next: { tags: ["travelAgentPage"] } }).catch(() => null);
  const content = mergeTravelAgentContent(sanityDoc);

  return <TravelAgentBody heroBackgroundImage={content.heroBackgroundImage} />;
}
