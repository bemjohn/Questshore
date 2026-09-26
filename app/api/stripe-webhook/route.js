import Stripe from "stripe";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

async function sendBookingEmail(session, stripe) {
  const host = process.env.EMAIL_HOST || "mail.spacemail.com";
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn("Email credentials not configured, skipping email send");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

  const metadata = session.metadata || {};
  const customerDetails = session.customer_details || {};
  const amountTotal = (session.amount_total / 100).toFixed(2);
  const customerName = `${metadata.firstName || ""} ${metadata.lastName || ""}`.trim() || customerDetails.name || "Not provided";
  const customerEmail = session.customer_email || metadata.email || "Not provided";
  const phone = customerDetails.phone || "Not provided";

  const lineItemsHtml = lineItems.data.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.description || item.price?.product_data?.name || "Item"}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${(item.amount_total / 100).toFixed(2)}</td>
    </tr>
  `).join("");

  const metadataHtml = Object.entries(metadata)
    .filter(([key]) => !["firstName", "lastName", "email"].includes(key))
    .map(([key, value]) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">${key}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${value || "Not provided"}</td>
      </tr>
    `).join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #f8fafc; border-radius: 12px; padding: 32px;">
        <h1 style="color: #0ea5e9; margin: 0 0 24px; font-size: 24px;">New Booking Received</h1>

        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
          <h2 style="font-size: 16px; color: #374151; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">Customer Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280;">Name</td><td style="padding: 8px 0; font-weight: 500;">${customerName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; font-weight: 500;">${customerEmail}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; font-weight: 500;">${phone}</td></tr>
          </table>
        </div>

        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
          <h2 style="font-size: 16px; color: #374151; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">Payment Summary</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280;">Total Paid</td><td style="padding: 8px 0; font-weight: 600; font-size: 18px; color: #059669;">$${amountTotal}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Payment Status</td><td style="padding: 8px 0; font-weight: 500;">${session.payment_status}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Session ID</td><td style="padding: 8px 0; font-family: monospace; font-size: 12px;">${session.id}</td></tr>
          </table>
        </div>

        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
          <h2 style="font-size: 16px; color: #374151; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">Line Items</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Item</th>
                <th style="padding: 12px; text-align: center; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Qty</th>
                <th style="padding: 12px; text-align: right; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${lineItemsHtml}
            </tbody>
          </table>
        </div>

        <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
          <h2 style="font-size: 16px; color: #374151; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">Booking Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${metadataHtml}
          </table>
        </div>

        <p style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          This email was sent automatically from the QuestAshore booking system.
        </p>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: user,
    to: user,
    subject: `New Booking: ${metadata.excursionName || "Excursion"} - ${customerName}`,
    html,
  });
}

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

    try {
      await sendBookingEmail(session, stripe);
      console.log("Booking confirmation email sent successfully");
    } catch (emailErr) {
      console.error("Failed to send booking email:", emailErr.message);
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