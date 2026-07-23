import { client } from "@/lib/sanity/client";
import { GROUP_EXCURSIONS_QUERY } from "@/lib/sanity/queries";
import { mergeGroupExcursionsContent } from "@/lib/content/groupExcursions.merge";
import GroupExcursionsBody from "./GroupExcursionsBody";

export default async function GroupExcursionsPage() {
  const sanityDoc = await client.fetch(GROUP_EXCURSIONS_QUERY, {}, { next: { tags: ["groupExcursionsPage"] } }).catch(() => null);
  const content = mergeGroupExcursionsContent(sanityDoc);

  return <GroupExcursionsBody heroBackgroundImage={content.heroBackgroundImage} />;
}
