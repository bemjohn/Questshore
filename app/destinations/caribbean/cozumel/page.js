"use client";

import BookingSidebar from "@/components/BookingSidebar";

export default function CozumelPage() {
  return (
    <>
      <section className="w-full min-h-[450px] relative flex items-center bg-slate-900 overflow-hidden py-16 px-6 md:px-12">
        <img
          src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60 z-0"
        />
        <div className="bg-gradient-to-r from-black/70 via-black/30 to-transparent absolute inset-0 z-10" />
        <div className="relative z-20 max-w-5xl text-left text-white space-y-2">
          <span className="text-teal-400 text-xs font-semibold tracking-widest uppercase block">
            CARIBBEAN EXCURSIONS
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-serif tracking-tight font-normal">
            Cozumel, Mexico
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        {/* Dolphin Swim Encounter at Chankanaab Marine Park */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 mb-16 border-b border-slate-100 last:border-b-0">
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-sm relative">
              <img
                src="https://images.unsplash.com/photo-1537956965359-7573183f1d57?auto=format&fit=crop&w=800&q=80"
                alt=""
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Dolphin Swim Encounter at Chankanaab Marine Park</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              Chankanaab National Marine Park in Cozumel is the perfect setting for a memorable, bucket list dolphin experience. The Dolphin Connection program is designed to create a fun and personal connection with one of the ocean's most fascinating animals in a safe and respectful environment. Your experience begins with a 15-minute educational session led by a professional instructor, where you'll learn about dolphin anatomy, habits, behaviors, and their senses.
            </p>
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-4 block">
              Excursion Highlights&hellip;
            </span>
            <ul className="list-disc pl-5 space-y-3 marker:text-slate-400">
              {[
                "Experience an interactive dolphin swim in Cozumel at Chankanaab National Marine Park, one of the island's top shore excursion destinations",
                "Enjoy up to 40 minutes in the water with one dolphin in a small group of up to 8 guests, creating a more personal and immersive experience",
                "Take part in up to 18 dolphin behaviors, including a kiss, fin shake, Dolphin Embrace, Heart to Heart, and Ocean Echo",
                "Bonus experiences: 10-minute manatee meet and greet and a sea lion presentation",
                "Enjoy access to Chankanaab Park facilities including buffet, open bar, pool, and sea lion presentation",
              ].map((h, i) => (
                <li key={i} className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <BookingSidebar
              title="Dolphin Swim Encounter at Chankanaab Marine Park"
              showForm
              showCheckout
              showInfo
              pricing={[
                { adultLabel: "Per Adult $110", childLabel: "Per Child 1-12y/o Free", adultPrice: 110, childPrice: 0 },
              ]}
            />
          </div>
        </div>

        {/* Manatee Encounter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 mb-16 border-b border-slate-100 last:border-b-0">
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-sm relative">
              <img
                src="https://images.unsplash.com/photo-1602440231902-ffe0c7b1f348?auto=format&fit=crop&w=800&q=80"
                alt=""
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Manatee Encounter</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              There's swimming, and then there's swimming with manatees! The Manatee Swim and Chankanaab Park excursion will be the absolute highlight of your Cozumel visit. Submerge yourself in the underwater world of the manatee. During this unusual encounter, you will be able to meet and interact with these magnificent creatures, including the very popular kiss and hug, and feed them in their home in the sea.
            </p>
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-4 block">
              Excursion Highlights&hellip;
            </span>
            <ul className="list-disc pl-5 space-y-3 marker:text-slate-400">
              {[
                "Swim with and feed delightful manatees during a hands-on encounter",
                "Enjoy unlimited access to Chankanaab National Marine Park",
                "Attend a sea lion show and dolphin presentation",
                "Take a self-guided archaeological tour",
                "Leave with lifetime memories and professional underwater photos",
              ].map((h, i) => (
                <li key={i} className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <BookingSidebar
              title="Manatee Encounter"
              showForm
              showCheckout
              showInfo
              pricing={[
                { adultLabel: "Per Adult $79", adultPrice: 79 },
              ]}
            />
          </div>
        </div>

        {/* Explore Cozumel Historical & Beach Break */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 mb-16 border-b border-slate-100 last:border-b-0">
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-sm relative">
              <img
                src="https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?auto=format&fit=crop&w=800&q=80"
                alt=""
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Explore Cozumel Historical & Beach Break</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              Want to combine a historical experience with beach fun? This is for you. Explore the Cozumel City tour with its historical center and flea market, iconic monuments, and a visit to a Mayan village for a tasting of tequila, organic chocolate, and a pre-Hispanic taco.
            </p>
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-4 block">
              Excursion Highlights&hellip;
            </span>
            <ul className="list-disc pl-5 space-y-3 marker:text-slate-400">
              {[
                "Cozumel City tour visiting historical center and flea market",
                "Iconic monuments and photo of the Cozumel sign",
                "Visit to a Mayan village for a tasting of tequila, organic chocolate, a pre-Hispanic taco made with seeds, and a complimentary beverage",
                "Visit to the Mayan temple where the first official Catholic mass was celebrated in 1518",
                "Visit to a black coral factory, Cozumel's only local craft",
                "Beach club access includes all amenities: lounge chairs, shade, pool, showers, restrooms, and Wi-Fi",
              ].map((h, i) => (
                <li key={i} className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <BookingSidebar
              title="Explore Cozumel Historical & Beach Break"
              showForm
              showCheckout
              showInfo
              pricing={[
                { adultLabel: "Per Adult $65", adultPrice: 65 },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
