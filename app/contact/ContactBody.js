"use client";

import { useState } from "react";

export default function ContactBody({ data }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    cruiseShip: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const hero = data?.hero || {};
  const info = data?.info || {};
  const formSettings = data?.form || {};

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
      <section className="relative bg-slate-900 py-16 md:py-24 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-white text-4xl md:text-6xl font-serif tracking-tight mb-4">
            {hero.heading || "Get in Touch"}
          </h1>
          <p className="text-slate-300 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed px-4">
            {hero.description || "Have questions about our port excursions or need help planning your time ashore?"}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3 block">
            {info.eyebrow || "CONTACT US"}
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-slate-900 mb-6">
            {info.heading || "We'd Love to Hear From You"}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8 text-sm md:text-base">
            {info.description || "Drop us a message, and we will get back to you within 24 hours."}
          </p>
          <div className="space-y-6 border-t border-slate-100 pt-6">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Support Hours</p>
              <p className="text-slate-800 font-medium text-sm md:text-base mt-1">
                {info.supportHours || "Monday – Friday, 9:00 AM – 5:00 PM (EST)"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Us Directly</p>
              <a
                href={`mailto:${info.email || "hello@questashore.com"}`}
                className="text-slate-900 font-semibold underline underline-offset-4 hover:text-slate-600 transition-colors text-sm md:text-base mt-1 inline-block"
              >
                {info.email || "hello@questashore.com"}
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{formSettings.successTitle || "Message Sent!"}</h3>
              <p className="text-slate-600 max-w-md mx-auto">
                {formSettings.successText || "Thank you for reaching out. We will get back to you within 24 hours."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6"
              name="contact-us"
            >
              <input type="hidden" name="form-name" value="contact-us" />

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                <input required type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900 text-sm" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email address" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900 text-sm" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">Cruise Ship & Sail Date (Optional)</label>
                <input type="text" name="cruiseShip" value={form.cruiseShip} onChange={handleChange} placeholder="e.g., Celebrity Beyond - Oct 12" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900 text-sm" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">Your Message *</label>
                <textarea required name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us about your upcoming cruise plans or questions..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900 text-sm resize-none" />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">Something went wrong. Please try again or email us directly.</p>
              )}

              <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-4 px-6 rounded-xl transition-colors duration-300 shadow-sm mt-4 text-sm tracking-wide cursor-pointer">
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
