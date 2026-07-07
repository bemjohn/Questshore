"use client";

export default function Counter({ value, onChange, min = 0 }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-7 h-7 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center text-sm font-medium cursor-pointer"
      >
        -
      </button>
      <span className="w-6 text-center text-sm font-semibold text-slate-800">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-7 h-7 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center text-sm font-medium cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
