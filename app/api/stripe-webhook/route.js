import Stripe from "stripe";
import { sendBookingConfirmation } from "@/lib/notifications/booking-confirmation";

export const runtime = "nodejs";

const emailedSessions = new Set();

export async function POST(req) {
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeWebhookSecret) {
    console.error("Stripe webhook secret missing from server environment.");
    return new Response(
      JSON.stringify({ message: "Stripe webhook secret missing from server environment." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!stripeSecretKey) {
    console.error("Stripe secret key missing from server environment.");
    return new Response(
      JSON.stringify({ message: "Stripe secret key missing from server environment." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const stripe = new Stripe(stripeSecretKey);
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response(
      JSON.stringify({ message: "Missing stripe-signature header" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  let event;

  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, signature, stripeWebhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return new Response(
      JSON.stringify({ message: "Invalid webhook signature" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata || {};

    const booking = {
      bookingRef: metadata.bookingRef || session.id,
      excursionName: metadata.excursionName || "",
      destinationPort: metadata.destinationPort || "",
      preferredDate: metadata.preferredDate || "",
      shipDetails: metadata.shipDetails || "",
      adultCount: Number(metadata.adultCount || 0),
      childCount: Number(metadata.childCount || 0),
      commitmentFee: Number(metadata.commitmentFee || 0),
      totalTourCost: Number(metadata.totalTourCost || 0),
      firstName: metadata.firstName || session.customer_details?.name?.split(" ")[0] || "",
      lastName: metadata.lastName || session.customer_details?.name?.split(" ").slice(1).join(" ") || "",
      email: session.customer_email || metadata.email || "",
    };

    console.log("Stripe checkout.session.completed:", {
      id: session.id,
      paymentStatus: session.payment_status,
      ...booking,
    });

    if (session.payment_status === "paid" && booking.email && !emailedSessions.has(session.id)) {
      emailedSessions.add(session.id);
      try {
        const res = await sendBookingConfirmation(booking);
        if (res && res.ok) {
          console.log(`Confirmation email sent for session ${session.id}`);
        } else if (res) {
          console.error(`Confirmation email failed for session ${session.id}:`, await res.text());
        }
      } catch (err) {
        console.error("Failed to send booking confirmation email:", err);
      }
    }
  } else if (event.type === "checkout.session.expired") {
    const session = event.data.object;
    const metadata = session.metadata || {};

    const bookingRef = metadata.bookingRef || session.id;
    const email = session.customer_email || metadata.email || "";
    const firstName = metadata.firstName || "";
    const lastName = metadata.lastName || "";
    const excursionName = metadata.excursionName || "";

    console.log(`[Abandoned Booking] Reference: ${bookingRef}, Customer: ${email}`);

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}