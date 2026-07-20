"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
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
  );
}
