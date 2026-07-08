"use client";

import BookingSidebar from "@/components/BookingSidebar";

export default function RoatanPage() {
  return (
    <>
      <section className="w-full min-h-[450px] relative flex items-center bg-slate-900 overflow-hidden py-16 px-6 md:px-12">
        <img
          src="https://images.unsplash.com/photo-1590523741831-ab7e8b3f8d1c?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60 z-0"
        />
        <div className="bg-gradient-to-r from-black/70 via-black/30 to-transparent absolute inset-0 z-10" />
        <div className="relative z-20 max-w-5xl text-left text-white space-y-2">
          <span className="text-teal-400 text-xs font-semibold tracking-widest uppercase block">
            CARIBBEAN EXCURSIONS
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-serif tracking-tight font-normal">
            Roatan, Honduras
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        {/* Overview + POI */}
        <div className="pb-12 mb-12 border-b border-slate-100">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Overview</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8">
              Discover the beauty of Roatan — a premier cruise port in the Bay Islands of Honduras, renowned for its stunning coral reefs, white-sand beaches, and rich Garifuna culture.
            </p>
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-3">
              Points Of Interests
            </h3>
            <div className="flex flex-wrap gap-3">
              {["West Bay Beach", "Carambola Gardens", "Roatan Marine Park"].map((poi) => (
                <span
                  key={poi}
                  className="bg-slate-100 rounded-full px-4 py-2 text-sm font-medium text-slate-700"
                >
                  {poi}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Roatan By Land And Sea */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 mb-16 border-b border-slate-100 last:border-b-0">
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-sm relative">
              <img
                src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"
                alt=""
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Roatan By Land And Sea</h2>
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-4 block">
              Excursion Highlights&hellip;
            </span>
            <ul className="list-disc pl-5 space-y-3 marker:text-slate-400">
              {[
                "Explore local villages, historic landmarks, and scenic lookout points on a guided island tour",
                "Set sail on a relaxing small-group cruise departing from West End Beach",
                "Snorkel the world's second-largest barrier reef alongside an experienced guide",
                "Watch playful dolphins during a visit to the Institute of Marine Science",
                "Unwind with free time on the beach before returning to your ship",
              ].map((h, i) => (
                <li key={i} className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <BookingSidebar
              title="Roatan By Land And Sea"
              showForm
              showCheckout
              showInfo
              pricing={[
                { adultLabel: "Per Adult $68", adultPrice: 68 },
              ]}
            />
          </div>
        </div>

        {/* Day Pass at a Private Island Beach Resort & Orphanage Visit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 mb-16 border-b border-slate-100 last:border-b-0">
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-sm relative">
              <img
                src="https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&w=800&q=80"
                alt=""
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Day Pass at a Private Island Beach Resort & Orphanage Visit</h2>
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-4 block">
              Excursion Highlights&hellip;
            </span>
            <ul className="list-disc pl-5 space-y-3 marker:text-slate-400">
              {[
                "Experience the beauty of Roatan's community and culture on the unique Roatan Orphanage tour — an opportunity to give back to the community, not to be missed",
                "Unwind at Bradey Cay's Island after your visit to the orphanage",
                "Benefit from roundtrip transportation and a certified friendly bilingual guide",
              ].map((h, i) => (
                <li key={i} className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <BookingSidebar
              title="Day Pass at a Private Island Beach Resort & Orphanage Visit"
              showForm
              showCheckout
              showInfo
              pricing={[
                { adultLabel: "Per Adult $48", adultPrice: 48 },
              ]}
            />
          </div>
        </div>

        {/* Roatan Animal Sanctuary & Beach Break */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 mb-16 border-b border-slate-100 last:border-b-0">
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-sm relative">
              <img
                src="https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80"
                alt=""
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Roatan Animal Sanctuary & Beach Break</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              This tour combines exploration and relaxation in a tropical paradise. Travel in comfort with our experienced local guide, who'll offer rich insights into Roatan's history and culture.
            </p>
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-4 block">
              Excursion Highlights&hellip;
            </span>
            <ul className="list-disc pl-5 space-y-3 marker:text-slate-400">
              {[
                "Visit unique attractions such as an iguana farm",
                "Explore the Sloth and Monkey Sanctuary",
                "Stroll through botanical gardens",
                "End the day lounging on a private all-inclusive island with peaceful scenery",
              ].map((h, i) => (
                <li key={i} className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <BookingSidebar
              title="Roatan Animal Sanctuary & Beach Break"
              showForm
              showCheckout
              showInfo
              pricing={[
                { adultLabel: "Per Adult $74", adultPrice: 74 },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
