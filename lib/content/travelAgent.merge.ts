import { travelAgentFallback, type TravelAgentContent } from "./travelAgent.fallback";
import { urlForString } from "@/lib/sanity/image";

export function mergeTravelAgentContent(sanity: any): TravelAgentContent {
  return {
    heroBackgroundImage:
      urlForString(sanity?.heroBackgroundImage) || travelAgentFallback.heroBackgroundImage,
  };
}
