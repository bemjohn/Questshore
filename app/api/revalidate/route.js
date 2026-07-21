import { revalidatePath } from "next/cache";
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
    } else if (docType === "destination") {
      revalidatePath("/destinations", "page");
      if (slug) {
        revalidatePath(`/destinations/${slug}`, "page");
      }
    } else if (docType === "navigation") {
      revalidatePath("/", "layout");
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
