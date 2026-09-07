import Stripe from "stripe";

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { excursionName, amount, email, firstName, lastName } = await req.json();

    if (!excursionName || !amount || amount <= 0) {
      return new Response(
        JSON.stringify({ message: "Missing or invalid booking details" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      currency: "usd",
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(amount * 100),
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
    return new Response(
      JSON.stringify({ message: "Error creating Stripe session", error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
