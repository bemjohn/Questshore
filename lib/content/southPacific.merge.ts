import { southPacificFallback, type SouthPacificContent } from "./southPacific.fallback";
import { urlForString } from "@/lib/sanity/image";

export function mergeSouthPacificContent(sanity: any): SouthPacificContent {
  const heroBackgroundImage =
    urlForString(sanity?.heroBackgroundImage) || southPacificFallback.heroBackgroundImage;

  const destinations =
    sanity?.destinations && sanity.destinations.length > 0
      ? sanity.destinations.map((d: any, i: number) => {
          const fb = southPacificFallback.destinations[i];
          return {
            id: d.slug?.current || fb?.id || `sp-${i}`,
            title: d.title || fb?.title || "Unknown",
            badges: fb?.badges || [],
            image: urlForString(d.cardImage) || fb?.image || "",
          };
        })
      : southPacificFallback.destinations;

  return { heroBackgroundImage, destinations };
}
