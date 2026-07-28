"use client";

import { useCurrency } from "@/lib/context/CurrencyContext";

const currencies = [
  { code: "AUD", label: "AUD $" },
  { code: "USD", label: "USD $" },
];

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-0.5 border border-gray-200 rounded-lg overflow-hidden">
      {currencies.map((c) => (
        <button
          key={c.code}
          onClick={() => setCurrency(c.code)}
          className={`px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
            currency === c.code
              ? "bg-sky-700 text-white"
              : "bg-white text-gray-500 hover:text-sky-700"
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
