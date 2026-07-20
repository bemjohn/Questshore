import { client } from "@/lib/sanity";
import { affiliateNetworkPageQuery, destinationsByRegion } from "@/lib/queries";
import AffiliateNetworkBody from "./AffiliateNetworkBody";

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

  return <AffiliateNetworkBody data={data} destinations={destinations} />;
}
