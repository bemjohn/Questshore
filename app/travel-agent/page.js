"use client";

import { useState } from "react";
import Link from "next/link";
import DestinationCard from "@/components/DestinationCard";
import { destinationsFallback as destinations } from "@/lib/content/destinations.fallback";

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
        <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-[1.8]">
          <p>
            We are excited to connect with travel agents and travel advisors who are looking to offer their clients memorable destinations experiences .As a growing brand, we believe that meaningful partnerships are built on trust,collaboration and a shared commitment to exceptional service.
          </p>
          <p>
            We invite you to grow with us, as we build a network of trusted travel professionals. By partnering together, you&rsquo;ll have the opportunity to introduce your clients to carefully curated excursions and authentic local experiences in each of our listed destinations while working with a team that values communication,reliability and personalised support.
          </p>
          <p>
            We&rsquo;re committed to creating long term relationships with our partners and welcome the opportunity to learn, grow and succeed together
          </p>
          <p>
            If you&rsquo;re interested in collaborating, we&rsquo;d love to hear from you.Lets work together to create unforgettable travel experiences for your clients while building a partnership that benefits us both.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">THE PERKS</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
              <div className="text-3xl font-bold text-sky-600 mb-4">01)</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Earn Commision:</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Make an extra earning through our excursions —monthly
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
              <div className="text-3xl font-bold text-sky-600 mb-4">02)</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Our Excursions Are Lower Priced And Higher Quality</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                compared with the cruise lines, we only operates smaller size group,no crowded buses,average excursions size is 12 persons
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
              <div className="text-3xl font-bold text-sky-600 mb-4">03)</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Guarantee Return To Ship</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We have never had any customer miss their ship or left uncared for 
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
              <div className="text-3xl font-bold text-sky-600 mb-4">04)</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">24\7 Supports and Guidiance</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We offer full supports via our emails, as a small and new cruise focused brand, we are prompt with responses and make sure everything goes well as expected
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
              <div className="text-3xl font-bold text-sky-600 mb-4">05)</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">We&rsquo;re Better Together</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                By Partnering with us, you encourage us to give back to the communities across each destinations your clients visit .
                Our Collaboration is simply to help shape the best experiences for each cruise passengers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Our Destinations</span>
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
                  placeholder="We'd love to hear from you!"
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
