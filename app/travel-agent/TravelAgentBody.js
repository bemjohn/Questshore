"use client";

import { useState } from "react";
import Link from "next/link";

const fallbackPerks = [
  { number: "01", title: "VIP Access & Rates", text: "Offer your clients exclusive pricing and priority booking on our most sought-after excursions." },
  { number: "02", title: "Dedicated Support", text: "A personal account manager assigned to your agency for priority support and booking assistance." },
  { number: "03", title: "Marketing Resources", text: "Access to professional photos, brochures, and customizable marketing materials." },
];

export default function TravelAgentBody({ data, destinations }) {
  const [form, setForm] = useState({
    agencyName: "",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const hero = data?.hero || {};
  const introText = data?.intro || null;
  const perks = data?.perks || {};
  const formSection = data?.formSection || {};

  const perkList = perks.perks?.length ? perks.perks : fallbackPerks;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    try {
      const formData = new FormData(e.target);
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });
      if (res.status === 200) {
        setSubmitted(true);
      } else {
        throw new Error("Form submission failed");
      }
    } catch {
      setError(true);
    }
  }

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${hero.backgroundImage || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80"}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-sky-900/70" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
            {hero.heading || "TRAVEL AGENT NETWORK"}
          </h1>
        </div>
      </section>

      {introText && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-[1.8]">
            {introText.map((block, i) => {
              if (block._type === 'block') {
                return <p key={i}>{block.children.map(c => c.text).join('')}</p>;
              }
              return null;
            })}
          </div>
        </section>
      )}

      {!introText && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-[1.8]">
            <p>Partner with QuestAshore and offer your clients exclusive shore excursions that transform port days into unforgettable adventures. Our travel agent network provides you with competitive rates, priority booking, and dedicated support to help you deliver exceptional experiences.</p>
            <p>Join a growing community of travel professionals who trust QuestAshore to elevate their clients' cruise vacations. From the South Pacific to the Caribbean, our curated excursions give you a competitive edge and keep your clients coming back.</p>
          </div>
        </section>
      )}

      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">{perks.eyebrow || "THE PERKS"}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {perkList.map((perk, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
                <div className="text-3xl font-bold text-sky-600 mb-4">{perk.number})</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{perk.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{perk.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Our Destinations</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {destinations.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="relative overflow-hidden rounded-2xl group h-48 shadow-sm hover:shadow-xl transition-all duration-300 block"
            >
              <img
                src={dest.image || ''}
                alt={dest.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <h3 className="text-white font-bold text-sm leading-tight">{dest.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/destinations" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-semibold text-base transition-colors">
            See all destinations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">{formSection.eyebrow || "Get In Touch"}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">{formSection.heading || "Partner With Us"}</h2>
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{formSection.successTitle || "Message Received!"}</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {formSection.successText || "Thank you for reaching out. Our partnerships team will be in touch shortly."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 space-y-6" name="travel-agent-network">
              <input type="hidden" name="form-name" value="travel-agent-network" />

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Agency Name *</label>
                <input required name="agencyName" value={form.agencyName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Contact Name *</label>
                <input required name="contactName" value={form.contactName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Email *</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Phone (Optional)</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Message *</label>
                <textarea required name="message" rows={4} value={form.message} onChange={handleChange} placeholder="We'd love to hear from you!" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">Something went wrong. Please try again or email us directly.</p>
              )}

              <button type="submit" className="w-full py-3.5 px-6 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-base">
                Send Partnership Inquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
