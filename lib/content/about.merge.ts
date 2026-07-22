import { aboutFallback, type AboutContent } from "./about.fallback";
import { urlForString } from "@/lib/sanity/image";

export function mergeAboutContent(sanity: any): AboutContent {
  return {
    heroBanner: urlForString(sanity?.heroBanner) || aboutFallback.heroBanner,
    collageImage1: urlForString(sanity?.collageImage1) || aboutFallback.collageImage1,
    collageImage2: urlForString(sanity?.collageImage2) || aboutFallback.collageImage2,
    collageImage3: urlForString(sanity?.collageImage3) || aboutFallback.collageImage3,
  };
}
