export async function sendBookingConfirmation(booking) {
  const provider = process.env.EMAIL_PROVIDER || "none";

  if (provider === "resend") {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    if (!apiKey || !from) {
      console.error("EMAIL_PROVIDER=resend but RESEND_API_KEY / RESEND_FROM_EMAIL missing.");
      return;
    }
    const usd = (n) => `$${Number(n || 0).toFixed(2)}`;

    const text = [
      `Hi ${booking.firstName} ${booking.lastName},`,
      "",
      `Thanks for your booking with QuestAshore! We've received your commitment fee of ${usd(booking.commitmentFee)}.`,
      "",
      `Booking Reference: ${booking.bookingRef}`,
      `Excursion: ${booking.excursionName}`,
      booking.destinationPort ? `Destination Port: ${booking.destinationPort}` : "",
      booking.preferredDate ? `Preferred Date: ${booking.preferredDate}` : "",
      booking.shipDetails ? `Ship Details: ${booking.shipDetails}` : "",
      `Guests: ${booking.adultCount || 0} Adult(s)${booking.childCount ? `, ${booking.childCount} Child(ren)` : ""}`,
      `Total Tour Cost: ${usd(booking.totalTourCost)}`,
      `Amount Received: ${usd(booking.commitmentFee)}`,
      "",
      "We will be in touch shortly with full details of your excursion.",
      "",
      "Happy sailing,",
      "The QuestAshore Team",
    ]
      .filter(Boolean)
      .join("\n");

    const htmlRows = [
      ["Booking Reference", booking.bookingRef],
      ["Excursion", booking.excursionName],
      ["Destination Port", booking.destinationPort],
      ["Preferred Date", booking.preferredDate],
      ["Ship Details", booking.shipDetails],
      ["Guests", `${booking.adultCount || 0} Adult(s)${booking.childCount ? `, ${booking.childCount} Child(ren)` : ""}`],
      ["Total Tour Cost", usd(booking.totalTourCost)],
      ["Commitment Fee Received", usd(booking.commitmentFee)],
    ]
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px;border-bottom:1px solid #eef1f4;color:#64748b;white-space:nowrap;vertical-align:top;">${k}</td><td style="padding:6px 12px;border-bottom:1px solid #eef1f4;color:#0f172a;font-weight:600;">${v}</td></tr>`
      )
      .join("");

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;">
        <h2 style="color:#0284c7;margin-bottom:4px;">Booking Confirmation</h2>
        <p style="margin-top:4px;color:#475569;">Thanks for your booking, ${booking.firstName} ${booking.lastName}! Your commitment fee is confirmed and one of our team will reach out shortly with your excursion details.</p>
        <table style="width:100%;border-collapse:collapse;margin-top:16px;">${htmlRows}</table>
        <p style="margin-top:24px;color:#94a3b8;font-size:13px;">Happy sailing — The QuestAshore Team</p>
      </div>`;

    return fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: booking.email,
        subject: `QuestAshore Booking Confirmation – ${booking.excursionName}`,
        text,
        html,
      }),
    });
  }

  console.log("[booking-confirmation] No email provider configured. Booking:", booking);
}