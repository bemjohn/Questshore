"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What happens if our ship misses the port or changes its itinerary?",
    a: "Since all bookings are handled individually and routed straight to our team via email, we offer 100% flexible manual updates or full refunds if your ship cannot dock.",
  },
  {
    q: "How do I receive my excursion confirmation and tickets?",
    a: "Once you fill out our booking inquiry form, our coordination team processes the request and sends your detailed itinerary sheet directly to your email inbox.",
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
              className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 mt-3" : "max-h-0"}`}
            >
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
