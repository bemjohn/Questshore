import { caribbeanFallback, type CaribbeanContent } from "./caribbean.fallback";
import { urlForString } from "@/lib/sanity/image";

export function mergeCaribbeanContent(sanity: any): CaribbeanContent {
  const heroBackgroundImage =
    urlForString(sanity?.heroBackgroundImage) || caribbeanFallback.heroBackgroundImage;

  const destinations =
    sanity?.destinations && sanity.destinations.length > 0
      ? sanity.destinations.map((d: any, i: number) => {
          const fb = caribbeanFallback.destinations[i];
          return {
            id: d.slug?.current || fb?.id || `carib-${i}`,
            title: d.title || fb?.title || "Unknown",
            badges: fb?.badges || [],
            image: urlForString(d.cardImage) || fb?.image || "",
          };
        })
      : caribbeanFallback.destinations;

  return { heroBackgroundImage, destinations };
}
