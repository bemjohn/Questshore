import { groupExcursionsFallback, type GroupExcursionsContent } from "./groupExcursions.fallback";
import { urlForString } from "@/lib/sanity/image";

export function mergeGroupExcursionsContent(sanity: any): GroupExcursionsContent {
  const fb = groupExcursionsFallback;

  const groupExperiences =
    sanity?.groupExperiences && sanity.groupExperiences.length > 0
      ? sanity.groupExperiences.map((exp: any, i: number) => {
          const fallback = fb.groupExperiences[i];
          return {
            order: exp.order || fallback?.order || "",
            title: exp.title || fallback?.title || "",
            description: exp.description || fallback?.description || "",
            imageUrl: urlForString(exp.image, 800) || fallback?.imageUrl || "",
            alt: exp.alt || fallback?.alt || exp.title || "",
            reversed:
              typeof exp.reversed === "boolean" ? exp.reversed : fallback?.reversed ?? false,
          };
        })
      : fb.groupExperiences;

  return {
    heroBackgroundImage:
      urlForString(sanity?.heroBackgroundImage) || fb.heroBackgroundImage,
    groupExperiences,
  };
}
