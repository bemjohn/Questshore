"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What happens if our ship misses the port or changes its itinerary?",
    a: "Since all bookings are handled individually and routed straight to our team via email, we offer 100% flexible manual updates or full refunds if your ship cannot dock.",
  },
  {
    q: "How do I receive my excursion confirmation and tickets?",
    a: "Once your reservation has been made and your deposit has been securely processed through our PayPal seller account , you will receive a booking confirmation, along with your detailed excursion information and itinerary, at the email address you provided.",
  },
  {
    q: "Can I book all my shore excursions with you?",
    a: "We believe your holiday should be effortless from embarkation to disembarkation. Instead of searching for excursions at every port, let us take care of the planning.",
    bullets: [
      "Save up and enjoy our multiple port discounts on your total booking",
      "One dedicated team throughout your cruise",
      "Carefully planned experiences in every destination",
      "Less time planning during your holiday and more time enjoying it",
      "Peace of mind with our return-to-ship commitment",
    ],
  },
];

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(null);

  function toggle(idx) {
    setOpenIdx(openIdx === idx ? null : idx);
  }

  return (
    <div className="max-w-3xl mx-auto divide-y divide-gray-200">
      {faqs.map((faq, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i} className="py-5">
            <button
              onClick={() => toggle(i)}
              className="flex items-center justify-between w-full text-left cursor-pointer"
            >
              <span className="text-base font-semibold text-gray-900 pr-4">{faq.q}</span>
              <svg
                className={`w-5 h-5 text-sky-600 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[600px] mt-3" : "max-h-0"}`}
            >
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              {faq.bullets && (
                <ul className="mt-3 space-y-2">
                  {faq.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                      <svg
                        className="w-4 h-4 text-sky-600 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
