"use client";

import { useState } from 'react';

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

export default function AboutBody({ data }) {
  const [activeTab, setActiveTab] = useState(data?.tabs?.[0]?.name?.toLowerCase().replace(/\s+/g, '-') || 'how-it-started');

  const hero = data?.hero || {};
  const tabs = data?.tabs || [];
  const whyChooseUs = data?.whyChooseUs || {};

  return (
    <>
      <section className="w-full min-h-[70vh] md:min-h-[85vh] relative flex items-end pb-12 md:pb-20 overflow-hidden">
        <img
          src={hero.backgroundImage || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80"}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="bg-gradient-to-t from-black/80 via-black/30 to-transparent absolute inset-0 z-10" />
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-white text-5xl md:text-7xl font-serif tracking-tight mb-4 font-normal relative z-20">{hero.title || "About us"}</h1>
          <p className="text-white/90 text-base md:text-xl max-w-2xl leading-relaxed font-light tracking-wide relative z-20">
            {hero.description || "QuestAshore is all about encouraging cruise guests to adventure beyond the shore."}
          </p>
        </div>
      </section>
      <section>
        <div className="w-full border-b border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-12 flex gap-12 justify-start pt-8 pb-0">
            {tabs.map((tab) => {
              const tabId = tab.name?.toLowerCase().replace(/\s+/g, '-');
              return (
                <button
                  key={tabId}
                  onClick={() => setActiveTab(tabId)}
                  className={`transition-all duration-300 pb-4 relative font-medium text-sm md:text-base ${
                    activeTab === tabId
                      ? 'text-slate-900 border-b-2 border-slate-900'
                      : 'text-slate-400 border-b-2 border-transparent hover:text-slate-600'
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto px-4 md:px-12 py-16">
          <div>
            <div className="flex items-center gap-6 md:gap-8 w-full">
              <div className="w-[40%] flex flex-col gap-6">
                <img
                  src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=400&q=80"
                  alt=""
                  className="w-full aspect-[4/5] object-cover rounded-[32px] shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80"
                  alt=""
                  className="w-full aspect-[4/5] object-cover rounded-[32px] shadow-sm"
                />
              </div>
              <div className="w-[60%] -mt-12 md:-mt-16 mb-12 md:mb-16">
                <img
                  src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"
                  alt=""
                  className="w-full aspect-[4/5] object-cover rounded-[40px] shadow-md"
                />
              </div>
            </div>
          </div>
          <div>
            {tabs.map((tab) => {
              const tabId = tab.name?.toLowerCase().replace(/\s+/g, '-');
              if (activeTab !== tabId) return null;
              return (
                <div key={tabId}>
                  <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4 block">{tab.name?.toUpperCase()}</span>
                  {tab.quote && (
                    <p className="text-2xl md:text-3xl font-serif font-normal text-slate-900 leading-snug mb-8 block">
                      &ldquo;{tab.quote}&rdquo;
                    </p>
                  )}
                  {tab.body && (
                    <div className="flex flex-col gap-6 text-slate-600 text-sm md:text-base leading-relaxed">
                      {tab.body.map((block, i) => {
                        if (block._type === 'block') {
                          return <p key={i}>{block.children.map(c => c.text).join('')}</p>;
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">{whyChooseUs.eyebrow || "Why Choose Us"}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">{whyChooseUs.heading || "Our Advantages"}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {(whyChooseUs.cards || []).map((card, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out group text-center">
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
      </section>
    </>
  );
}
