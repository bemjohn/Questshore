"use client";

import { useState } from 'react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('how-it-started');
  return (
    <>
      <section className="w-full min-h-[70vh] md:min-h-[85vh] relative flex items-end pb-12 md:pb-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80"
          alt="Group of travelers laughing and exploring a tropical coastal port city on a shore excursion"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="bg-gradient-to-t from-black/80 via-black/30 to-transparent absolute inset-0 z-10" />
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-white text-5xl md:text-7xl font-serif tracking-tight mb-4 font-normal relative z-20">About us</h1>
          <p className="text-white/90 text-base md:text-xl max-w-2xl leading-relaxed font-light tracking-wide relative z-20">
            QuestAshore is all about encouraging cruise guests to adventure beyond the shore..And making each destination exciting and accessible with our bucket list experiences.
          </p>
        </div>
      </section>
      <section>
        <div className="w-full border-b border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-12 flex gap-12 justify-start pt-8 pb-0">
            <button
              onClick={() => setActiveTab('how-it-started')}
              className={`transition-all duration-300 pb-4 relative font-medium text-sm md:text-base ${
                activeTab === 'how-it-started'
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-400 border-b-2 border-transparent hover:text-slate-600'
              }`}
            >
              How It Started
            </button>
            <button
              onClick={() => setActiveTab('giving-back')}
              className={`transition-all duration-300 pb-4 relative font-medium text-sm md:text-base ${
                activeTab === 'giving-back'
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-400 border-b-2 border-transparent hover:text-slate-600'
              }`}
            >
              Giving Back
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto px-4 md:px-12 py-16">
          <div>
            <div className="flex items-center gap-6 md:gap-8 w-full">
              <div className="w-[40%] flex flex-col gap-6">
                <img
                  src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=400&q=80"
                  alt="Travelers exploring a tropical destination"
                  className="w-full aspect-[4/5] object-cover rounded-[32px] shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80"
                  alt="Group of friends laughing on a boat excursion"
                  className="w-full aspect-[4/5] object-cover rounded-[32px] shadow-sm"
                />
              </div>
              <div className="w-[60%] -mt-12 md:-mt-16 mb-12 md:mb-16">
                <img
                  src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"
                  alt="Travelers on a shore excursion boat adventure"
                  className="w-full aspect-[4/5] object-cover rounded-[40px] shadow-md"
                />
              </div>
            </div>
          </div>
          <div>
            {activeTab === 'how-it-started' && (
              <>
                <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4 block">HOW IT STARTED</span>
                <p className="text-2xl md:text-3xl font-serif font-normal text-slate-900 leading-snug mb-8 block">
                  &ldquo;Being Well Travelled Isn&rsquo;t About The Number Of Cruises You&rsquo;ve Taken Or The Ports You&rsquo;ve Visited. It&rsquo;s About How You Deeply Connect With Each Destination&rdquo;
                </p>
                <div className="flex flex-col gap-6 text-slate-600 text-sm md:text-base leading-relaxed">
                  <p>Travel is one of life&rsquo;s greatest teachers. It gives us the opportunity to step beyond our familiar surroundings, embrace the unknown, and discover the beauty, cultures, and stories that make every destination unique.</p>
                  <p>I started QuestAshore as a way to explore destinations with fellow travellers. What began as a personal passion has grown into something far greater than I ever imagined, with travellers now trusting me to curate unforgettable shore experiences around the world for families, solo travelers, and singles.</p>
                  <p>Today, we help cruise travellers plan stress-free experiences in every port of call from small-group shore excursions to private, tailor-made adventures. Every experience is carefully selected to help you make the most of your time ashore.</p>
                  <p>For many cruisers, the cost of shore excursions can be almost as much as, or even more than, the cruise itself. For a long time, that stopped me from fully exploring the destinations I visited. That experience inspired me to find better, more affordable, and more meaningful ways to discover each port without compromising on quality.</p>
                  <p>Whether you&rsquo;re a seasoned cruiser or embarking on your very first voyage, our carefully curated experiences are designed to immerse you in local culture, uncover hidden gems, and create memories that last long after your cruise ends. By choosing local operators wherever possible, we also help support the communities that make each destination so special.</p>
                </div>
              </>
            )}
            {activeTab === 'giving-back' && (
              <>
                <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4 block">GIVING BACK</span>
                <p className="text-2xl md:text-3xl font-serif font-normal text-slate-900 leading-snug mb-8 block">&ldquo;Do More With Your Booking&rdquo;</p>
                <div className="flex flex-col gap-6 text-slate-600 text-sm md:text-base leading-relaxed">
                  <p>We believe that travel should be sustainable and responsible</p>
                  <p>As a brand we strive to create unforgettable experiences and interactions with the local communities across the various countries we curate excursions in.</p>
                  <p>We educate ourselves about global and local issues and we give back by donating a portion of the profits made from each bookings towards important local causes</p>
                  <p>As we travel and support local partners globally,we don&rsquo;t only empower local businesses by supporting small business owners but we seek out partnership with organisations that are about the betterment of their communities</p>
                </div>
                <div className="border-l-2 border-slate-900 pl-4 mt-8 space-y-1">
                  <p className="text-sm font-semibold tracking-wide text-slate-700 italic block">&ldquo;IT IS EVERY MAN&rsquo;S OBLIGATION TO PUT BACK INTO THE WORLD AT LEAST THE EQUIVALENT OF WHAT HE TAKES OUT OF IT&rdquo;</p>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-medium block mt-1">Albert Einstein</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Why Choose Us</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Our Advantages</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out group text-center">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-100 transition-colors">
              <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Travel With Confidence</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              All excursions are vetted, insured, and operated by trusted local partners.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out group text-center">
            <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-sky-100 transition-colors">
              <svg className="w-7 h-7 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Back to Ship Guaranteed</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              We coordinate with your ship&apos;s schedule. If delayed, we get you to the next port at no cost.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out group text-center">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-amber-100 transition-colors">
              <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Payment Plan ($)</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Secure your adventure with a deposit and pay the rest before you sail &mdash; interest-free.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out group text-center">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-rose-100 transition-colors">
              <svg className="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Giving Back</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              A portion of every booking supports local communities and marine conservation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
