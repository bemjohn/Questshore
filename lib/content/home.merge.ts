import { homeFallback, type HomeContent } from "./home.fallback";
import { urlForString } from "@/lib/sanity/image";

export function mergeHomeContent(sanity: any): HomeContent {
  const hero = {
    title: sanity?.heroTitle || homeFallback.hero.title,
    subtitle: sanity?.heroSubtitle || homeFallback.hero.subtitle,
    imageUrl: urlForString(sanity?.heroImage) || homeFallback.hero.imageUrl,
  };

  const cards =
    sanity?.cards && sanity.cards.length > 0
      ? sanity.cards.map((c: any, i: number) => ({
          id: c._id,
          title: c.title || homeFallback.cards[i]?.title || "Untitled",
          slug: c.slug?.current || homeFallback.cards[i]?.slug || "",
          imageUrl: urlForString(c.image) || homeFallback.cards[i]?.imageUrl || "",
        }))
      : homeFallback.cards;

  const testimonials =
    sanity?.testimonials && sanity.testimonials.length > 0
      ? sanity.testimonials.map((t: any) => ({
          id: t._key || t._id,
          quote: t.quote || "",
          author: t.author || "Anonymous",
        }))
      : homeFallback.testimonials;

  return { hero, cards, testimonials };
}
