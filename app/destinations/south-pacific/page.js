import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { SOUTH_PACIFIC_QUERY } from "@/lib/sanity/queries";
import { mergeSouthPacificContent } from "@/lib/content/southPacific.merge";

export default async function SouthPacificPage() {
  const sanityDoc = await client.fetch(SOUTH_PACIFIC_QUERY, {}, { next: { tags: ["southPacificPage"] } }).catch(() => null);
  const content = mergeSouthPacificContent(sanityDoc);

  return (
    <>
      <section className="w-full min-h-[550px] relative flex items-center bg-slate-900 overflow-hidden py-20 px-6 md:px-12">
        <img
          src={content.heroBackgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70 z-0"
        />
        <div className="bg-gradient-to-r from-black/80 via-black/40 to-transparent absolute inset-0 z-10" />
        <div className="relative z-20 max-w-3xl text-left text-white space-y-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-white max-w-5xl leading-tight">
            <span className="block mb-2 text-2xl md:text-4xl font-extrabold tracking-tight opacity-95">
              Did your itinerary say South Pacific?
            </span>
            <span className="block text-xl md:text-2xl font-normal opacity-90">
              Make your time ashore worthwhile with our bucket list experiences
            </span>
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {content.destinations.map((loc) => (
          <Link
            key={loc.id}
            href={`/destinations/south-pacific/${loc.id}`}
            className="relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer group shadow-md bg-slate-800 transition-all duration-300 hover:scale-[1.01] block"
          >
            <img
              src={loc.image}
              alt={loc.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60 mix-blend-multiply"
            />
            <div className="absolute top-4 left-4 flex gap-2 z-20">
              {loc.badges.map((badge) => (
                <span
                  key={badge}
                  className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide border border-white/10"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-left text-white z-20">
              <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
                {loc.title}
              </h2>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
