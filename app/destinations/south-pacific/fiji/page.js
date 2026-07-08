"use client";

import BookingSidebar from "@/components/BookingSidebar";

export default function FijiPage() {
  return (
    <>
      <section className="w-full min-h-[450px] relative flex items-center bg-slate-900 overflow-hidden py-16 px-6 md:px-12">
        <img
          src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60 z-0"
        />
        <div className="bg-gradient-to-r from-black/70 via-black/30 to-transparent absolute inset-0 z-10" />
        <div className="relative z-20 max-w-5xl text-left text-white space-y-2">
          <span className="text-teal-400 text-xs font-semibold tracking-widest uppercase block">
            SOUTH PACIFIC EXCURSIONS
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-serif tracking-tight font-normal">
            Fiji Islands
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        {/* Lautoka Essentielle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 mb-16 border-b border-slate-100 last:border-b-0">
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-sm relative">
              <img
                src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80"
                alt=""
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Lautoka Essentielle</h2>
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-4 block">
              Excursion Highlights&hellip;
            </span>
            <ul className="list-disc pl-5 space-y-3 marker:text-slate-400">
              {[
                "Scenic drive through Lautoka, Fiji's sugar city, with local landmarks and everyday island life",
                "Visit the vibrant local market with colors, aromas and fresh produce",
                "Natural spa experience at the famous mud pools and hot spring",
                "Stroll through the stunning Garden of the Sleeping Giant with orchid collections",
                "Relax and unwind at the beautiful Crowne Plaza Resort with pool and beach access",
              ].map((h, i) => (
                <li key={i} className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <BookingSidebar
              title="Lautoka Essentielle"
              showForm
              showCheckout
              showInfo
              pricing={[
                { adultLabel: "Adult :$80", childLabel: "Child: $40", adultPrice: 80, childPrice: 40 },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
