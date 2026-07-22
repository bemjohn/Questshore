import { groupExcursionsFallback, type GroupExcursionsContent } from "./groupExcursions.fallback";
import { urlForString } from "@/lib/sanity/image";

export function mergeGroupExcursionsContent(sanity: any): GroupExcursionsContent {
  return {
    heroBackgroundImage:
      urlForString(sanity?.heroBackgroundImage) || groupExcursionsFallback.heroBackgroundImage,
  };
}
