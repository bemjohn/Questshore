"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero({ heroImage, heroTitle, heroSubtitle }) {
  const router = useRouter();
  const [port, setPort] = useState("");
  const [cruiseLine, setCruiseLine] = useState("");
  const [date, setDate] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (port) {
      router.push("/destinations");
    }
  }

  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/20 z-10"></div>

      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
          {heroTitle || "Make every destination memorable"}
          <br />
          <span className="text-cyan-300">Shore Excursions</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow">
          {heroSubtitle || "Curated bucket-list adventures waiting for you at every port of call."}
        </p>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1 text-left">
                Destination
              </label>
              <select
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all cursor-pointer"
              >
                <option value="">Select a region...</option>
                <option value="south-pacific">South Pacific</option>
                <option value="caribbean">Caribbean Excursions</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1 text-left">
                Cruise Line
              </label>
              <input
                type="text"
                value={cruiseLine}
                onChange={(e) => setCruiseLine(e.target.value)}
                placeholder="e.g. Royal Caribbean"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1 text-left">
                Tour Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
