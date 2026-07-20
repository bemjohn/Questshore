import { client } from "@/lib/sanity";
import { aboutPageQuery } from "@/lib/queries";
import AboutBody from "./AboutBody";

export default async function AboutPage() {
  let data;
  try {
    data = await client.fetch(aboutPageQuery);
  } catch {
    data = null;
  }

  return <AboutBody data={data} />;
}
