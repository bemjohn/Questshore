"use client";

import BookingSidebar from "@/components/BookingSidebar";

export default function PortVilaPage() {
  return (
    <>
      <section className="w-full min-h-[450px] relative flex items-center bg-slate-900 overflow-hidden py-16 px-6 md:px-12">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60 z-0"
        />
        <div className="bg-gradient-to-r from-black/70 via-black/30 to-transparent absolute inset-0 z-10" />
        <div className="relative z-20 max-w-5xl text-left text-white space-y-2">
          <span className="text-teal-400 text-xs font-semibold tracking-widest uppercase block">
            SOUTH PACIFIC EXCURSIONS
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-serif tracking-tight font-normal">
            Port Vila, Vanuatu
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        {/* Vila Signature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 mb-16 border-b border-slate-100 last:border-b-0">
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-sm relative">
              <img
                src="https://images.unsplash.com/photo-1507876466758-bc54f967809a?auto=format&fit=crop&w=800&q=80"
                alt=""
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Vila Signature</h2>
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-4 block">
              Excursion Highlights&hellip;
            </span>
            <ul className="list-disc pl-5 space-y-3 marker:text-slate-400">
              {[
                "Enjoy a full day guided tour departing from Port-Vila ,a scenic drive and tour through THE LOCAL MARKETS ,DUTY FREE SHOPS and THE CITY CENTRE",
                "Step into a TRADITIONAL CULTURAL VILLAGE to discover the local customs of the islanders,arts and handcrafted creations",
                "Swim,unwind or simply relax at the stunning BLUE LAGOON",
                "Spend time surrounded by nature as you swim in refreshing pools, take in stunning WATERFALL views, explore scenic walking trails in a peaceful tropical setting.",
                "Savor an included lunch at a local venue, featuring a set menu inspired by the authentic island flavors",
              ].map((h, i) => (
                <li key={i} className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <BookingSidebar
              title="Vila Signature"
              showForm
              showCheckout
              showInfo
              pricing={[
                { adultLabel: "Per Adult $90", childLabel: "Per Child Ages $45 (6-12y/o)", adultPrice: 90, childPrice: 45 },
              ]}
            />
          </div>
        </div>

        {/* Vila Tranquil/Snorkel Combo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 mb-16 border-b border-slate-100 last:border-b-0">
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-sm relative">
              <img
                src="https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=800&q=80"
                alt=""
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Vila Tranquil/Snorkel Combo</h2>
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-4 block">
              Excursion Highlights&hellip;
            </span>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Make the most of your time in Port-Vila with a quick escape to some of its most stunning spots-head to the BLUE LAGOON for crystal-clear swimming and return to relax by gorgeous IRIRIKI ISLAND which reveal vibrant marine life in a peaceful natural setting,where you can snorkel right off the beach of calm,turquoise waters surrounded by natural beauty and end your day discovering the best SOUVENIR SHOPS and DUTY FREE SHOPPING
            </p>
          </div>
          <div className="lg:col-span-5">
            <BookingSidebar
              title="Vila Tranquil/Snorkel Combo"
              showForm
              showCheckout
              showInfo
              pricing={[
                { adultLabel: "Per Adult $120", childLabel: "Per Child $60 (6-12y/o)", adultPrice: 120, childPrice: 60 },
              ]}
            />
          </div>
        </div>

        {/* Adventurous Splash */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 mb-16 border-b border-slate-100 last:border-b-0">
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-sm relative">
              <img
                src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=800&q=80"
                alt=""
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Adventurous Splash</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Experience the best of Efate in one unforgettable adventure combining land,sea and pure adrenaline. Start your day rope jumping/swimming the stunning BLUE LAGOON ,then shift gears inland with an exciting adventure on a QUAD BIKE or the unforgettable HORSE RIDING experiences. End the day with a scenic drive back to the city,explore local markets and duty free shops for your keepsake
            </p>
          </div>
          <div className="lg:col-span-5">
            <BookingSidebar
              title="Adventurous Splash"
              showForm
              showCheckout
              showInfo
              pricing={[
                { adultLabel: "Per Adult $180", childLabel: "Per Child $90 (6-12y/o)", adultPrice: 180, childPrice: 90 },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
