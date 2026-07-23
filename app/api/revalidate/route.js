import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

export async function POST(req) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    const { isValidSignature, body } = await parseBody(req, secret);

    if (!isValidSignature) {
      return new Response(
        JSON.stringify({ message: "Invalid webhook signature" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const docType = body?._type;
    const slug = body?.slug?.current;

    if (docType === "homePage") {
      revalidatePath("/", "page");
      revalidateTag("homePage");
    } else if (docType === "destination") {
      revalidatePath("/destinations/south-pacific", "page");
      revalidatePath("/destinations/caribbean", "page");
      revalidatePath("/travel-agent", "page");
      revalidatePath("/destinations", "page");
      revalidateTag("southPacificPage");
      revalidateTag("caribbeanPage");
      revalidateTag("travelAgentPage");
      revalidateTag("destinations");
      revalidateTag("destination");
      if (slug) {
        revalidatePath(`/destinations/${slug}`, "page");
      }
    } else if (docType === "navigation") {
      revalidatePath("/", "layout");
    } else if (docType === "aboutPage") {
      revalidatePath("/about", "page");
      revalidateTag("aboutPage");
    } else if (docType === "southPacificPage") {
      revalidatePath("/destinations/south-pacific", "page");
      revalidateTag("southPacificPage");
    } else if (docType === "caribbeanPage") {
      revalidatePath("/destinations/caribbean", "page");
      revalidateTag("caribbeanPage");
    } else if (docType === "groupExcursionsPage") {
      revalidatePath("/group-excursions", "page");
      revalidateTag("groupExcursionsPage");
    } else if (docType === "travelAgentPage") {
      revalidatePath("/travel-agent", "page");
      revalidateTag("travelAgentPage");
    } else {
      revalidatePath("/", "layout");
    }

    return new Response(
      JSON.stringify({ revalidated: true, now: Date.now(), body }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Error revalidating", error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
