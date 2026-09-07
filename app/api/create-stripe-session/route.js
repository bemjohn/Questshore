import Stripe from "stripe";

export async function POST(req) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    console.error("Stripe secret key missing from server environment.");
    return new Response(
      JSON.stringify({ error: "Stripe secret key missing from server environment." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const stripe = new Stripe(stripeSecretKey);

  const { excursionName, amount, email, firstName, lastName } = await req.json();

  const parsedAmount = parseFloat(String(amount ?? "").replace(/[^0-9.]/g, ""));

  if (!excursionName) {
    return new Response(
      JSON.stringify({ message: "Missing or invalid booking details" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return new Response(
      JSON.stringify({ message: "Invalid amount" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const unitAmount = Math.round(parsedAmount * 100);

  const origin = req.headers.get("origin") || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      currency: "usd",
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: unitAmount,
            product_data: {
              name: `${excursionName} - Commitment Fee`,
              description: `Booking for ${firstName || ""} ${lastName || ""}`.trim(),
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/?booking=success`,
      cancel_url: `${origin}/?booking=cancelled`,
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Stripe Session Error:", err);
    return new Response(
      JSON.stringify({ message: "Error creating Stripe session", error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
