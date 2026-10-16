"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What happens if our ship misses the port or changes its itinerary?",
    a: "If your cruise ship changes its scheduled port of call or is unable to dock for any reason, we will issue the full value of your shore excursions as QuestaCredits. These credits can be used toward a future experience with us, a different port experience, or transferred to a new cruise passenger of your choice.",
  },
  {
    q: "How do I receive my excursion confirmation and tickets?",
    a: "Once your reservation has been made and a deposit/payment towards your shore excursions is complete, you will receive a booking confirmation along with your detailed port excursions information and itinerary at the email address you provided during your booking.",
  },
  {
    q: "Can I book all port shore excursions with Questashore?",
    a: "We believe your holiday should be effortless from embarkation to disembarkation. Instead of searching for excursions at every port, let us take care of the planning.",
    bullets: [
      "Save up and enjoy our multiple port discounts on your total booking",
      "One dedicated team throughout your cruise",
      "Carefully planned experiences in every destination",
      "Less time planning during your holiday and more time enjoying it",
      "Peace of mind with our return-to-ship commitment",
    ],
  },
  {
    q: "Do you accomodate large groups?",
    a: "Yes! We welcome large cruise passenger groups and private parties. We can tailor our excursions to suit your group's size, interests and schedules. We also make every effort to keep all group members together throughout the excursions, ensuring everyone can share the experience and enjoy their time together. Also contact us to discuss your group's requirements and we'll be happy to create a memorable experience for everyone.",
  },
  {
    q: "Do group coordinators receive any special advantage?",
    a: "Yes! We love helping group coordinators create an enjoyable experience for their tribe and even offer special benefits for group bookings. Depending on the size: Groups of 20 or more paying members receive a complimentary excursion for their group leader, while groups of up to 15 or more paying members can enjoy discounted rates. Contact us to discuss your group booking and plan better together.",
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
