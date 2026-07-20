import { client } from "@/lib/sanity";
import { contactPageQuery } from "@/lib/queries";
import ContactBody from "./ContactBody";

export default async function ContactPage() {
  let data;
  try {
    data = await client.fetch(contactPageQuery);
  } catch {
    data = null;
  }

  return <ContactBody data={data} />;
}
