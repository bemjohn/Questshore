import { client } from "@/lib/sanity";
import { groupExcursionsPageQuery } from "@/lib/queries";
import GroupExcursionsBody from "./GroupExcursionsBody";

export default async function GroupExcursionsPage() {
  let data;
  try {
    data = await client.fetch(groupExcursionsPageQuery);
  } catch {
    data = null;
  }

  return <GroupExcursionsBody data={data} />;
}
