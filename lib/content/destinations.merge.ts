import { destinationsFallback, type DestinationCard } from "./destinations.fallback";
import { urlForString } from "@/lib/sanity/image";

export function mergeDestinations(sanity: any[] | null | undefined): DestinationCard[] {
  if (!sanity || !Array.isArray(sanity) || sanity.length === 0) {
    return destinationsFallback;
  }
  return sanity.map((d: any, i: number) => {
    const fb = destinationsFallback[i];
    return {
      id: d._id || fb?.id || `dest-${i}`,
      title: d.title || fb?.title || "Unknown",
      slug: d.slug?.current || fb?.slug || "",
      country: d.country || fb?.country || "",
      imageUrl: urlForString(d.cardImage) || fb?.imageUrl || "",
      heroImage: urlForString(d.heroImage || d.image) || fb?.heroImage || "",
      overview: d.overview || fb?.overview,
      points_of_interest: d.points_of_interest?.length > 0 ? d.points_of_interest : fb?.points_of_interest,
      excursions: mergeExcursions(d.excursions, fb?.excursions),
    };
  });
}

export function mergeSingleDestination(sanity: any, fallback: DestinationCard): DestinationCard {
  return {
    id: sanity?._id || fallback.id,
    title: sanity?.title || fallback.title,
    slug: sanity?.slug?.current || fallback.slug,
    country: sanity?.country || fallback.country,
    imageUrl: urlForString(sanity?.cardImage) || fallback.imageUrl,
    heroImage: urlForString(sanity?.heroImage || sanity?.image) || fallback.heroImage,
    overview: sanity?.overview || fallback.overview,
    points_of_interest: sanity?.points_of_interest?.length > 0 ? sanity.points_of_interest : fallback.points_of_interest,
    excursions: mergeExcursions(sanity?.excursions, fallback.excursions),
  };
}

function mergeExcursions(sanityExcursions: any[] | null | undefined, fallbackExcursions: any[]): any[] {
  if (!sanityExcursions || !Array.isArray(sanityExcursions) || sanityExcursions.length === 0) {
    return fallbackExcursions;
  }
  return sanityExcursions.map((e: any, i: number) => {
    const fb = fallbackExcursions[i];
    return {
      name: e.name || fb?.name || "Excursion",
      pricing: {
        adult: e.pricing?.adult ?? fb?.pricing?.adult ?? 0,
        child: e.pricing?.child ?? fb?.pricing?.child,
      },
      description: e.description || fb?.description,
      requiresTime: e.requiresTime ?? fb?.requiresTime,
      highlights: e.highlights?.length > 0 ? e.highlights : fb?.highlights || [],
    };
  });
}
