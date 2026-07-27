import BookingSidebar from "@/components/BookingSidebar";

export default function ExcursionRow({
  excursion,
  destinationPort,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 mb-16 border-b border-slate-100 last:border-b-0">
      <div className="lg:col-span-7">
        {excursion.photo && (
          <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-sm relative">
            <img
              src={excursion.photo}
              alt={excursion.name}
              className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        )}
        <h2 className="text-2xl font-serif text-slate-900 mb-4">{excursion.name}</h2>
        {excursion.description && (
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">{excursion.description}</p>
        )}
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-4 block">
          Excursion Highlights&hellip;
        </span>
        <ul className="list-disc pl-5 space-y-3 marker:text-slate-400">
          {excursion.highlights.map((h, i) => (
            <li key={i} className="text-slate-600 text-sm md:text-base leading-relaxed">{h}</li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-5">
        <BookingSidebar
          title={excursion.name}
          destinationPort={destinationPort}
          showForm
          showCheckout
          showInfo
          pricing={[
            {
              adultLabel: excursion.pricing.child !== undefined
                ? `Per Adult $${excursion.pricing.adult}`
                : `Per Adult $${excursion.pricing.adult}`,
              ...(excursion.pricing.child !== undefined
                ? { childLabel: excursion.pricing.child === 0
                    ? "Per Child 1-12y/o Free"
                    : `Per Child $${excursion.pricing.child} (6-12y/o)` }
                : {}),
              adultPrice: excursion.pricing.adult,
              childPrice: excursion.pricing.child,
            },
          ]}
        />
      </div>
    </div>
  );
}
