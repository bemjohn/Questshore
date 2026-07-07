"use client";

import BookingSidebar from "@/components/BookingSidebar";

export default function LifouPage() {
  return (
    <>
      <section className="w-full min-h-[450px] relative flex items-center bg-slate-900 overflow-hidden py-16 px-6 md:px-12">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60 z-0"
        />
        <div className="bg-gradient-to-r from-black/70 via-black/30 to-transparent absolute inset-0 z-10" />
        <div className="relative z-20 max-w-5xl text-left text-white space-y-2">
          <span className="text-teal-400 text-xs font-semibold tracking-widest uppercase block">
            SOUTH PACIFIC EXCURSIONS
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-serif tracking-tight font-normal">
            Lifou, New Caledonia
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        {/* Overview + POI */}
        <div className="pb-12 mb-12 border-b border-slate-100">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Overview</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8">
              The largest of the loyalty islands,Lifou lies some 118miles to the northwest of New Caledonia,Today's visitor are drawn to the islands spectacular scenery, which ranges from dense tropical forest to dramatic cliffs towering above the crashing waves. Lifou's white-sand beaches are some of the finest to be found in the entire Pacific
            </p>
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-3">
              Points Of Interests
            </h3>
            <div className="flex flex-wrap gap-3">
              {["Cliff of Jokin", "Vanilla Plantation", "Lueciba Beach"].map((poi) => (
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

        {/* Lifou Scenic Heritage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 mb-16 border-b border-slate-100 last:border-b-0">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Lifou Scenic Heritage</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Satisfy the senses during this captivating half day tour that begins with a scenic drive through Easo village, which bodied several traditional homes and flowering gardens. As a friendly locally based guide narrates, take in tropical terrains to visit the spectacular Jokin cliffs, where dramatic limestone cliffs rise above the turquoise Pacific Ocean, offering breathtaking coastal views and excellent photo opportunities. Continue to a local vanilla plantation, where you'll learns about the cultivation and processing of vanilla, one of islands most treasures crops.Discover the journey from vine to pod and gain insight into this important part of lifous local heritage. Afterward, unwind at lueciba beach, known for its crystal -clear waters and soft white sand..Enjoy time to swim, snorkel or simply relax by the shore.Keep an eye out for marine life -if you're lucky, you may spot sea turtles gliding through the lagoon,along with colourful tropical fish. A local lunch at a nearby local restaurant for a taste of Lifou specialty coconut crab and other island meal of your choice..A return back to the port
            </p>
          </div>
          <div className="lg:col-span-5">
            <BookingSidebar
              title="Lifou Scenic Heritage"
              showForm
              pricing={[
                { adultLabel: "Per Adult : $80", childLabel: "Per Child $40( 6-12y/o)", adultPrice: 80, childPrice: 40 },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
