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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 mb-16 border-b border-slate-100 last:border-b-0">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Lautoka Essentielle</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {`Begin with a scenic drive through Lautoka,Fiji's sugar city"where you'll discover local landmarks Anand everyday island life.visit the vibrant local market and experience the Colors, aromas and fresh produce that make fijis markets so unique. Continue to the famous mud pools and hotspring,where you can enjoy a natural spa experience and learn why locals have treasured these therapeutic waters for generations. Next stroll through the stunning Garden of the sleeping giant,home to lush tropical landscapes, tranquil walking paths and impressive collection of orchids nestled beneath the surrounding mountains. End the day at the beautiful Crowne Plaza Resort, where you'll have time to relax and enjoy Fiji at your own pace. Take a refreshing swim in the pool, unwind by the beach or simply soak up the tropical atmosphere before return to your ship. This excursion offers the perfect blend of sightseeing,culture,nature and relaxation-an ideal way to experience the best of lautoka in a single day.`}
            </p>
          </div>
          <div className="lg:col-span-5">
            <BookingSidebar
              title="Lautoka Essentielle"
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
