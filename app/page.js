import Link from "next/link";
import Hero from "@/components/Hero";
import FaqAccordion from "@/components/FaqAccordion";
import { client, urlFor } from "@/lib/sanity";
import { homePageQuery, destinationsByRegion } from "@/lib/queries";

const iconPaths = {
  'shield-check': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'info-circle': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'dollar-sign': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'heart': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
};

const iconColors = {
  'shield-check': 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100',
  'info-circle': 'bg-sky-50 text-sky-600 group-hover:bg-sky-100',
  'dollar-sign': 'bg-amber-50 text-amber-600 group-hover:bg-amber-100',
  'heart': 'bg-rose-50 text-rose-600 group-hover:bg-rose-100',
};

export default async function HomePage() {
  let page;
  let allDestinations;

  try {
    [page, allDestinations] = await Promise.all([
      client.fetch(homePageQuery),
      client.fetch(destinationsByRegion, { region: "South Pacific" }),
    ]);
  } catch {
    page = null;
    allDestinations = [];
  }

  const whyCards = page?.whyQuestAshore?.cards || [];
  const testimonialData = page?.testimonials || {};
  const faqSection = page?.faqSection || {};
  const destSection = page?.destinationsSection || {};

  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {destSection.heading || "Explore Our Destinations"}
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            {destSection.subtitle || "Handpicked shore excursions across the most breathtaking South Pacific ports."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allDestinations.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="relative overflow-hidden rounded-2xl group h-72 shadow-sm hover:shadow-xl transition-all duration-300 block"
            >
              <img
                src={urlFor(dest.cardImage).width(800).height(600).url()}
                alt={dest.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white font-bold text-lg leading-tight">{dest.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {page?.whyQuestAshore?.heading || "Why QuestAshore?"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-12">
            {whyCards.map((card, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group text-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors ${iconColors[card.icon] || 'bg-slate-50 text-slate-600 group-hover:bg-slate-100'}`}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[card.icon] || 'M12 6v6m0 0v6m0-6h6m-6 0H6'} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {testimonialData.heading || "Real Stories From Real Cruisers"}
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              {testimonialData.subtitle || "Hear from guests who experienced the QuestAshore difference."}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {(testimonialData.testimonials || []).map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating || 5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.avatarColor || 'bg-sky-100'} flex items-center justify-center text-sky-700 font-bold text-sm`}>
                    {t.avatarInitials || t.name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    {t.isVerified && <p className="text-gray-400 text-xs">Verified Guest</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {faqSection.heading || "Frequently Asked Questions"}
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            {faqSection.subtitle || "Everything you need to know before booking."}
          </p>
        </div>
        <FaqAccordion faqs={faqSection.faqs} />
      </section>
    </>
  );
}
