"use client";

import { useState } from "react";
import Link from "next/link";
import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/data/excursions";

export default function TravelAgentPage() {
  const [form, setForm] = useState({
    agencyName: "",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "form-name": "travel-agent-network", ...form }),
      });
      if (!res.ok && endpoint !== "/") throw new Error("Form submission failed");
      setSubmitted(true);
    } catch {
      setError(true);
    }
  }

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-sky-900/70" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
            TRAVEL AGENT NETWORK
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="text-xl sm:text-2xl text-gray-700 font-light leading-relaxed mb-8">
          We are delighted to partner with travel agents and advisors to offer your clients exceptional destination excursions and experiences across our focused regions.
        </p>
        <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-[1.8]">
          <p>
            We love to work with travel agencies and advisors to provide reliable, high quality tours that cruise passengers and hotel guests can book with confidence. From Cultural experiences and scenic sightseeing to adventure activities and relaxing beach escapes, our carefully curated excursions are designed to create unforgettable memories.
          </p>
          <p>
            We&apos;ll love to hear from you to discuss how this can be a positive advantage to both.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Why Partner With Us</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Benefits for Your Agency</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-12">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group text-center">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-100 transition-colors">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Travel With Confidence</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Your clients enjoy small group to private excursions operated by fully licensed and insured local partners you can trust.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group text-center">
              <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-sky-100 transition-colors">
                <svg className="w-7 h-7 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Back To Ship Guaranteed</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We coordinate every excursion with ship schedules so your clients return well before departure with complete peace of mind.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-amber-100 transition-colors">
                <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Payment Plan ($)</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Flexible payment options help your clients secure bookings affordably with convenient weekly or monthly plans.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group text-center">
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-rose-100 transition-colors">
                <svg className="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Giving Back</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Partnering with QuestAshore supports local communities and marine conservation across the destinations your clients visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Our Destinations</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Explore Partner Ports</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} dest={dest} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-semibold text-base transition-colors"
          >
            See all destinations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">How It Works</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 mb-12">Three Simple Steps</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="hover:-translate-y-2 transition-all duration-300 shadow-sm border border-slate-100 p-8 rounded-2xl bg-white group">
              <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-sky-100 transition-colors">
                <svg className="w-7 h-7 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-sky-600 mb-4">01</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reach Out</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Reach out and tell us about your clients
              </p>
            </div>
            <div className="hover:-translate-y-2 transition-all duration-300 shadow-sm border border-slate-100 p-8 rounded-2xl bg-white group">
              <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-sky-100 transition-colors">
                <svg className="w-7 h-7 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-sky-600 mb-4">02</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">We Tailor</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We tailor excursion packages to fit
              </p>
            </div>
            <div className="hover:-translate-y-2 transition-all duration-300 shadow-sm border border-slate-100 p-8 rounded-2xl bg-white group">
              <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-sky-100 transition-colors">
                <svg className="w-7 h-7 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-sky-600 mb-4">03</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Book With Confidence</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Your clients book with confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
              Get In Touch
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Partner With Us
            </h2>
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Received!</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Thank you for reaching out. Our partnerships team will be in touch shortly to discuss how we can work together.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 space-y-6"
              data-netlify="true"
              name="travel-agent-network"
            >
              <input type="hidden" name="form-name" value="travel-agent-network" />

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Agency Name *
                </label>
                <input
                  required
                  name="agencyName"
                  value={form.agencyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Contact Name *
                </label>
                <input
                  required
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your agency and how we can help..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-base"
              >
                Send Partnership Inquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
