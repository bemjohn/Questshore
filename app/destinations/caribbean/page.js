import Link from "next/link";

const locations = [
  {
    id: "roatan",
    title: "Roatan, Honduras",
    badges: ["Adventure", "Wildlife", "Beach"],
    image:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b3f8d1c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cozumel",
    title: "Cozumel, Mexico",
    badges: ["Marine", "History", "Culture"],
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80",
  },
];

export default function CaribbeanPage() {
  return (
    <>
      <section className="w-full min-h-[550px] relative flex items-center bg-slate-900 overflow-hidden py-20 px-6 md:px-12">
        <img
          src="https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70 z-0"
        />
        <div className="bg-gradient-to-r from-black/80 via-black/40 to-transparent absolute inset-0 z-10" />
        <div className="relative z-20 max-w-3xl text-left text-white space-y-4">
          <h1 className="text-white text-4xl md:text-6xl font-serif tracking-tight font-normal leading-[1.1]">
            Customised Destination Experiences You don't want to miss out on!
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {locations.map((loc) => (
          <Link
            key={loc.id}
            href={`/destinations/caribbean/${loc.id}`}
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
