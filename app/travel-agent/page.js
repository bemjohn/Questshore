"use client";

import { useState } from "react";

export default function TravelAgentPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    agencyName: "",
    credentials: "",
    email: "",
    phone: "",
    website: "",
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
        body: JSON.stringify({ "form-name": "travel-agent-application", ...form }),
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
          style={{ backgroundImage: "url(\x27https://images.unsplash.com/photo-1548574505-8bf0d5cd77e0?auto=format&fit=crop&w=1920&q=80\x27)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-sky-900/70" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
            Earn More. Elevate Your Clients&rsquo; Shore Experiences.
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            Partner with QuestAshore to offer your cruise clients handpicked, small-group, and private excursions that go far beyond the crowded pier.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">The Advisor Advantage</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Built for Travel Professionals</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Everything you need to grow your cruise business with confidence.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="hover:-translate-y-2 transition-all duration-300 shadow-sm border border-slate-100 p-8 rounded-2xl bg-white group">
            <div className="text-4xl mb-4">??</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Commission Structures</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Earn industry-leading commissions on every excursion your clients book through us, paid out seamlessly.
            </p>
          </div>
          <div className="hover:-translate-y-2 transition-all duration-300 shadow-sm border border-slate-100 p-8 rounded-2xl bg-white group">
            <div className="text-4xl mb-4">???</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Absolute Reputation Protection</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Sleep easy knowing your clients are backed by our 100% Back-To-Ship Guarantee. We handle the logistics; you get the credit.
            </p>
          </div>
          <div className="hover:-translate-y-2 transition-all duration-300 shadow-sm border border-slate-100 p-8 rounded-2xl bg-white group">
            <div className="text-4xl mb-4">?</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Tailor-Made Flexibility</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Need something custom for a VIP client or a boutique group? Our co-coordinators work hand-in-hand with you via email to build custom itineraries.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Get Started</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Register for the QuestAshore Advisor Program</h2>
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Received!</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Thank you for applying to the QuestAshore Advisor Program. Our partnerships team will review your application and reach out within 2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 space-y-6" data-netlify="true" name="travel-agent-application">
              <input type="hidden" name="form-name" value="travel-agent-application" />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">First Name *</label>
                  <input required name="firstName" value={form.firstName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Last Name *</label>
                  <input required name="lastName" value={form.lastName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Agency Name *</label>
                  <input required name="agencyName" value={form.agencyName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Core Credentials *</label>
                  <select required name="credentials" value={form.credentials} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option value="">Select credential</option>
                    <option value="CLIA">CLIA</option>
                    <option value="IATAN">IATAN</option>
                    <option value="TRUE">TRUE</option>
                    <option value="Host Agency Independent">Host Agency Independent</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Business Email *</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Phone Number *</label>
                  <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Website URL (Optional)</label>
                <input name="website" value={form.website} onChange={handleChange} placeholder="https://" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">Something went wrong. Please try again or email us directly.</p>
              )}
              <button type="submit" className="w-full py-3.5 px-6 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-base">
                Submit Partnership Application
              </button>
            </form>
          )}
        </div>
      </section>
      <section className="bg-sky-50 border-t border-b border-sky-100 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base sm:text-lg text-sky-900 font-medium leading-relaxed">
            ?? Client Retention Guaranteed: We strictly respect the agent-client relationship. Your clients remain <em>your</em> clients, always.
          </p>
        </div>
      </section>
    </>
  );
}
