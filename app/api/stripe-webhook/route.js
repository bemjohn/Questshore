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
  const excursionTitle = metadata.excursionName || "Tour";
  const customerName = `${metadata.firstName || ""} ${metadata.lastName || ""}`.trim() || customerDetails.name || "N/A";
  const customerEmail = session.customer_email || metadata.email || "N/A";
  const customerPhone = metadata.phone || customerDetails.phone || "N/A";
  const cruiseDetails = metadata.cruiseShip || metadata.cruiseLine || metadata.shipName || metadata.cruiseDetails || "N/A";
  const excursionDate = metadata.preferredDate || metadata.tourDate || metadata.date || "N/A";
  const bookingDate = new Date(session.created * 1000).toLocaleDateString('en-US', { dateStyle: 'full' });
  const adultCount = Number(metadata.adultCount || 0);
  const childCount = Number(metadata.childCount || 0);
  const guestBreakdown = `${adultCount} Adult(s), ${childCount} Child(ren)`;
  const totalCost = Number(metadata.totalTourCost || 0).toFixed(2);
  const depositPaid = amountTotal;
  const paymentStatus = session.payment_status;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #f8fafc; border-radius: 12px; padding: 32px;">
        <h1 style="color: #0ea5e9; margin: 0 0 24px; font-size: 24px;">New Booking Received (Deposit Paid)</h1>

        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
          <h2 style="font-size: 16px; color: #374151; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">--- EXCURSION & CRUISE DETAILS ---</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280;">Excursion Name</td><td style="padding: 8px 0; font-weight: 500;">${excursionTitle}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Excursion Date</td><td style="padding: 8px 0; font-weight: 500;">${excursionDate}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Cruise Ship / Line</td><td style="padding: 8px 0; font-weight: 500;">${cruiseDetails}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Total Guests</td><td style="padding: 8px 0; font-weight: 500;">${guestBreakdown}</td></tr>
          </table>
        </div>

        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
          <h2 style="font-size: 16px; color: #374151; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">--- CUSTOMER INFORMATION ---</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280;">Full Name</td><td style="padding: 8px 0; font-weight: 500;">${customerName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email Address</td><td style="padding: 8px 0; font-weight: 500;">${customerEmail}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Phone Number</td><td style="padding: 8px 0; font-weight: 500;">${customerPhone}</td></tr>
          </table>
        </div>

        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
          <h2 style="font-size: 16px; color: #374151; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">--- FINANCIAL & PAYMENT SUMMARY ---</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280;">Total Excursion Cost</td><td style="padding: 8px 0; font-weight: 600; font-size: 18px; color: #374151;">$${totalCost}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Deposit Paid Today</td><td style="padding: 8px 0; font-weight: 600; font-size: 18px; color: #059669;">$${depositPaid}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Balance Due on Excursion Day</td><td style="padding: 8px 0; font-weight: 600; font-size: 18px; color: #dc2626;">$${remainingBalance}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Payment Status</td><td style="padding: 8px 0; font-weight: 500;">${paymentStatus}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Booking Reference</td><td style="padding: 8px 0; font-family: monospace; font-size: 16px; color: #0ea5e9; font-weight: 700;">${bookingId}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Payment Date</td><td style="padding: 8px 0; font-weight: 500;">${bookingDate}</td></tr>
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
    subject: `Booking Confirmed: ${excursionTitle} - ${bookingId}`,
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
        <h1 style="color: #0ea5e9; margin: 0 0 24px; font-size: 24px;">Your Booking is Confirmed!</h1>

        <p style="font-size: 16px; color: #374151; margin-bottom: 24px; white-space: pre-line;">
          Hi ${customerName},
          Thank you for your payment to QuestAshore. Your deposit has been received and your place on the excursion is now secured.
          Your detailed shore excursion information will be sent to the email address provided with your booking.
          We look forward to welcoming you!
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