import { client } from "@/lib/sanity/client";
import { ABOUT_QUERY } from "@/lib/sanity/queries";
import { mergeAboutContent } from "@/lib/content/about.merge";
import AboutBody from "./AboutBody";

export default async function AboutPage() {
  const sanityDoc = await client.fetch(ABOUT_QUERY, {}, { next: { tags: ["aboutPage"] } }).catch(() => null);
  const content = mergeAboutContent(sanityDoc);

  return <AboutBody {...content} />;
}
