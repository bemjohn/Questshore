import Hero from "@/components/Hero";
import DestinationCard from "@/components/DestinationCard";
import FaqAccordion from "@/components/FaqAccordion";
import TrustpilotWidget from "@/components/TrustpilotWidget";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { client } from "@/lib/sanity/client";
import { HOME_QUERY, DESTINATIONS_QUERY } from "@/lib/sanity/queries";
import { mergeHomeContent } from "@/lib/content/home.merge";
import { mergeDestinations } from "@/lib/content/destinations.merge";
import { Sparkles } from "lucide-react";

export default async function HomePage() {
  const [sanityDoc, sanityDestinations] = await Promise.all([
    client.fetch(HOME_QUERY, {}, { next: { tags: ["homePage"] } }).catch(() => null),
    client.fetch(DESTINATIONS_QUERY, {}, { next: { tags: ["homePage", "destinations"] } }).catch(() => null),
  ]);
  const content = mergeHomeContent(sanityDoc);
  const destinations = mergeDestinations(sanityDestinations);

  return (
    <>
      <Hero
        heroImage={content.hero.imageUrl}
        heroTitle={content.hero.title}
        heroSubtitle={content.hero.subtitle}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Explore Our Destinations</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Handpicked shore excursions across the world&apos;s most breathtaking cruise destinations
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((card) => (
            <DestinationCard key={card.id} dest={card} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why QuestAshore?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-12">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group text-center">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-100 transition-colors">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Travel With Confidence</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Small group to private excursions, no crowded buses. We partner with friendly, fully licensed, and insured local businesses.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group text-center">
              <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-sky-100 transition-colors">
                <svg className="w-7 h-7 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Back To Ship Guaranteed</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We coordinate every excursion with your cruise itinerary and none of our guests has ever missed departure.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-amber-100 transition-colors">
                <Sparkles className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Bespoke Experiences</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Every experience is carefully selected and thoughtfully planned by our travel specialists. We focus on destinations we deeply understand and love, ensuring meaningful/authentic shore experiences that combine local insight, seamless planning, and unforgettable moments—so all you have to do is enjoy the journey.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group text-center">
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-rose-100 transition-colors">
                <svg className="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Giving Back</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We don’t just partner with locals; we give back too. A portion of each experience hosted supports community initiatives like education, women-led businesses, and local conservation effort to create a positive impact.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Real Stories From Real Cruisers</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Hear from guests who experienced the QuestAshore difference.
            </p>
          </div>
          <TestimonialCarousel testimonials={content.testimonials} />
          <div className="mt-12">
            <TrustpilotWidget />
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Everything you need to know before booking.
          </p>
        </div>
        <FaqAccordion />
      </section>
    </>
  );
}
