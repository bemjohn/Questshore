"use client";

import { useState } from "react";
import { Users, Briefcase, Sparkles } from "lucide-react";

export default function GroupExcursionsBody({ heroBackgroundImage }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    groupSize: 10,
    shipName: "",
    arrivalDate: "",
    destinations: [],
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const destOptions = ["Port Vila", "Noumea", "Lifou", "Fiji", "Roatan", "Cozumel"];
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        destinations: checked
          ? [...prev.destinations, value]
          : prev.destinations.filter((d) => d !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
          style={{ backgroundImage: `url(${heroBackgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
            Custom Group Shore Excursions
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            Tailor-made, private port adventures designed specifically for your group, family, or corporate crew. Move at your own pace, beyond the crowded pier.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-extrabold tracking-tight mb-6 uppercase">
            GROUP EXPERIENCES DESIGNED WITH YOU IN MIND
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
            We enjoy designing exclusive excursions for single cruisers, our hosted shore excursions are all about bringing people together. Meet fellow singles, discover incredible destinations, and enjoy experiences that are more fun when shared. Whether you&rsquo;re looking to make new friends, expand your social circle, or simply enjoy exploring with great company, every excursion offers a relaxed, welcoming atmosphere where meaningful connections happen naturally. Your next favorite travel memory could begin with the people you meet along the way.
          </p>
        </div>
        <div className="flex flex-col gap-16 max-w-5xl mx-auto px-4 mt-16">

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2">
              <span className="text-5xl font-extrabold text-slate-200 tracking-tight block mb-2 select-none">01</span>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Family & Milestone Celebrations</h3>
              <p className="text-gray-500 leading-relaxed">
                Keep multi-generational families together with pacing, vehicles, and activities perfect for both kids and grandparents.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-64 rounded-2xl bg-gradient-to-tr from-indigo-50 to-blue-100 opacity-90 transition-transform duration-500 hover:scale-[1.02] flex items-center justify-center">
              <Users className="text-indigo-400" size={48} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="w-full md:w-1/2">
              <span className="text-5xl font-extrabold text-slate-200 tracking-tight block mb-2 select-none">02</span>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Corporate & Incentive Groups</h3>
              <p className="text-gray-500 leading-relaxed">
                Reward your team with exclusive private island tours, catamaran charters, or custom team-building events coordinated around your ship's docking window.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-64 rounded-2xl bg-gradient-to-tr from-blue-50 to-cyan-100 opacity-90 transition-transform duration-500 hover:scale-[1.02] flex items-center justify-center">
              <Briefcase className="text-blue-400" size={48} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2">
              <span className="text-5xl font-extrabold text-slate-200 tracking-tight block mb-2 select-none">03</span>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Single &amp; Solo Social</h3>
              <p className="text-gray-500 leading-relaxed">
                Create an unforgettable pre- or post-wedding island day trip curated with private local guides, custom dining setups, and premium transport.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-64 rounded-2xl bg-gradient-to-tr from-rose-50 to-pink-100 opacity-90 transition-transform duration-500 hover:scale-[1.02] flex items-center justify-center">
              <Sparkles className="text-rose-400" size={48} />
            </div>
          </div>

        </div>
      </section>
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Get Started</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Design Your Private Group Experience</h2>
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Request Received!</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Thank you! Our group coordination team will reach out within 24 hours to start designing your custom shore experience.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 space-y-6" name="group-excursion-inquiry">
              <input type="hidden" name="form-name" value="group-excursion-inquiry" />

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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Email *</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Phone *</label>
                  <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Estimated Group Size *</label>
                  <input required type="number" name="groupSize" min="2" value={form.groupSize} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Cruise Ship Name *</label>
                  <input required name="shipName" value={form.shipName} onChange={handleChange} placeholder="e.g. Quantum of the Seas" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Estimated Port Arrival Date *</label>
                  <input required type="date" name="arrivalDate" value={form.arrivalDate} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Targeted Destination Interest</label>
                <div className="flex flex-wrap gap-3">
                  {destOptions.map((dest) => (
                    <label key={dest} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:border-sky-300 cursor-pointer transition-colors has-[:checked]:bg-sky-50 has-[:checked]:border-sky-400">
                      <input type="checkbox" name="destinations" value={dest} checked={form.destinations.includes(dest)} onChange={handleChange} className="accent-sky-600" />
                      <span className="text-sm text-gray-700">{dest}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Custom Request Notes</label>
                <textarea name="notes" rows={4} value={form.notes} onChange={handleChange} placeholder="Tell us about your group's vibe, mobility requirements, or special milestones you are celebrating..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"></textarea>
              </div>
              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">Something went wrong. Please try again or email us directly.</p>
              )}
              <button type="submit" className="w-full py-3.5 px-6 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-base">
                Request Group Blueprint
              </button>
            </form>
          )}
        </div>
      </section>
      <section className="bg-sky-50 border-t border-b border-sky-100 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base sm:text-lg text-sky-900 font-medium leading-relaxed">
            🔒 Full Fleet Coordination: All custom group departures feature our standard Back-To-Ship Guarantee. We perfectly align your private transport fleet with your ship&rsquo;s clearance hours, promising absolute punctuality.
          </p>
        </div>
      </section>
    </>
  );
}
