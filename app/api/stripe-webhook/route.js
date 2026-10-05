import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

async function sendAdminBookingEmail(session, stripe) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured, skipping email send");
    return;
  }

  const metadata = session.metadata || {};
  const customerDetails = session.customer_details || {};
  const amountTotal = (session.amount_total / 100).toFixed(2);
  const remainingBalance = Number(metadata.remainingBalance || "0").toFixed(2);
  const bookingId = metadata.bookingId || metadata.reservationRef || session.id;
  const excursionName = metadata.excursionName || "Tour";
  const customerName = `${metadata.firstName || ""} ${metadata.lastName || ""}`.trim() || customerDetails.name || "Not provided";
  const customerEmail = session.customer_email || metadata.email || "Not provided";
  const phone = customerDetails.phone || "Not provided";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #f8fafc; border-radius: 12px; padding: 32px;">
        <h1 style="color: #0ea5e9; margin: 0 0 24px; font-size: 24px;">Reservation Confirmed (Deposit Paid)</h1>

        <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 14px; color: #92400e;">
            <strong>Your booking is confirmed. Thanks for your payment to QuestAshore. This receipt confirms your deposit. Your final excursion details and meeting instructions will be provided separately to the email address provided in your booking.</strong>
          </p>
        </div>

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
            <tr><td style="padding: 8px 0; color: #6b7280;">Commitment Deposit Paid Today</td><td style="padding: 8px 0; font-weight: 600; font-size: 18px; color: #059669;">$${amountTotal}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Remaining Balance Due on Excursion Day</td><td style="padding: 8px 0; font-weight: 600; font-size: 18px; color: #dc2626;">$${remainingBalance}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Payment Status</td><td style="padding: 8px 0; font-weight: 500;">${session.payment_status}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Session ID</td><td style="padding: 8px 0; font-family: monospace; font-size: 12px;">${session.id}</td></tr>
          </table>
        </div>

        <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
          <h2 style="font-size: 16px; color: #374151; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">Booking Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280;">Excursion</td><td style="padding: 8px 0; font-weight: 500;">${excursionName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Booking Reference</td><td style="padding: 8px 0; font-family: monospace; font-size: 14px; color: #0ea5e9; font-weight: 600;">${bookingId}</td></tr>
          </table>
        </div>

        <p style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          This email was sent automatically from the QuestAshore booking system.
        </p>
      </div>
    </body>
    </html>
  `;

  const resend = getResend();
  if (!resend) return;

  const adminResponse = await resend.emails.send({
    from: "QuestAshore Bookings <noreply@questashore.com>",
    to: [process.env.ADMIN_NOTIFICATION_EMAIL || "hello@questashore.com"],
    subject: `Booking Confirmed: ${excursionName} - ${bookingId}`,
    html,
  });
  console.log("Admin email response:", adminResponse);
}

async function sendCustomerConfirmationEmail(session, stripe) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured, skipping customer confirmation email");
    return;
  }

  const metadata = session.metadata || {};
  const customerDetails = session.customer_details || {};
  const amountTotal = (session.amount_total / 100).toFixed(2);
  const remainingBalance = Number(metadata.remainingBalance || "0").toFixed(2);
  const bookingId = metadata.bookingId || metadata.reservationRef || session.id;
  const excursionName = metadata.excursionName || "Tour";
  const customerName = `${metadata.firstName || ""} ${metadata.lastName || ""}`.trim() || customerDetails.name || "Customer";
  const customerEmail = customerDetails.email || session.customer_email || metadata.email;

  if (!customerEmail || customerEmail === "Not provided") {
    console.warn("Customer email not available, skipping confirmation email");
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #f8fafc; border-radius: 12px; padding: 32px;">
        <h1 style="color: #0ea5e9; margin: 0 0 24px; font-size: 24px;">Reservation Confirmed (Deposit Paid)</h1>

        <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 14px; color: #92400e;">
            <strong>Your booking is confirmed. Thanks for your payment to QuestAshore. This receipt confirms your deposit. Your final excursion details and meeting instructions will be provided separately to the email address provided in your booking.</strong>
          </p>
        </div>

        <p style="font-size: 16px; color: #374151; margin-bottom: 24px;">
          Hi ${customerName},<br>
          Thank you for booking with QuestAshore! Your commitment deposit has been successfully processed to hold your reservation spot.
        </p>

        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
          <h2 style="font-size: 16px; color: #374151; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">Booking Reference</h2>
          <p style="margin: 0; font-family: monospace; font-size: 16px; color: #0ea5e9; font-weight: 700;">${bookingId}</p>
        </div>

        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
          <h2 style="font-size: 16px; color: #374151; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">Excursion Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280;">Excursion</td><td style="padding: 8px 0; font-weight: 500;">${excursionName}</td></tr>
          </table>
        </div>

        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
          <h2 style="font-size: 16px; color: #374151; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">Payment Summary</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280;">Commitment Deposit Paid Today</td><td style="padding: 8px 0; font-weight: 600; font-size: 18px; color: #059669;">$${amountTotal}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Remaining Balance Due on Excursion Day</td><td style="padding: 8px 0; font-weight: 600; font-size: 18px; color: #dc2626;">$${remainingBalance}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Payment Status</td><td style="padding: 8px 0; font-weight: 500;">${session.payment_status}</td></tr>
          </table>
        </div>

        <p style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          This email was sent automatically from the QuestAshore booking system.<br>
          If you have any questions, please contact us at support@questashore.com
        </p>
      </div>
    </body>
    </html>
  `;

  const resend = getResend();
  if (!resend) return;

  const customerResponse = await resend.emails.send({
    from: "QuestAshore Bookings <noreply@questashore.com>",
    to: [customerEmail],
    subject: `Booking Confirmed: ${excursionName} - ${bookingId}`,
    html,
  });
  console.log("Customer email response:", customerResponse);
}

export async function POST(req) {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response(
      JSON.stringify({ message: "Missing stripe-signature header" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const secrets = [process.env.STRIPE_WEBHOOK_SECRET, process.env.STRIPE_TEST_WEBHOOK_SECRET].filter(Boolean);

  if (secrets.length === 0) {
    console.error("Stripe webhook secret missing from server environment.");
    return new Response(
      JSON.stringify({ message: "Stripe webhook secret missing from server environment." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const rawBody = await req.text();
  let event;

  for (const secret of secrets) {
    try {
      event = Stripe.webhooks.constructEvent(rawBody, signature, secret);
      break;
    } catch (err) {
      continue;
    }
  }

  if (!event) {
    console.error("Stripe webhook signature verification failed for all secrets");
    return new Response(
      JSON.stringify({ message: "Invalid webhook signature" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const isLiveMode = event.livemode === true;
  const apiKey = isLiveMode
    ? process.env.STRIPE_SECRET_KEY
    : process.env.STRIPE_TEST_SECRET_KEY || process.env.STRIPE_SECRET_KEY;

  if (!apiKey) {
    console.error(`Stripe ${isLiveMode ? "live" : "test"} secret key missing from server environment.`);
    return new Response(
      JSON.stringify({ message: `Stripe ${isLiveMode ? "live" : "test"} secret key missing from server environment.` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const stripe = new Stripe(apiKey);

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
      livemode: event.livemode,
      ...booking,
    });

    try {
      await sendAdminBookingEmail(session, stripe);
      console.log("Admin booking notification email sent successfully");
    } catch (emailErr) {
      console.error("Failed to send admin booking email:", emailErr.message);
    }

    try {
      await sendCustomerConfirmationEmail(session, stripe);
      console.log("Customer confirmation email sent successfully");
    } catch (emailErr) {
      console.error("Failed to send customer confirmation email:", emailErr.message);
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