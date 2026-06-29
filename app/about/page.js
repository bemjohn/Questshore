export default function AboutPage() {
  return (
    <>
      <section className="relative py-28 sm:py-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-light italic leading-relaxed text-white/95">
            &ldquo;Being Well Travelled Isn&rsquo;t About The Number Of Cruises You&rsquo;ve Taken Or The Ports You&rsquo;ve Visited&mdash;It&rsquo;s About How You Deeply Connect With Each Destination&rdquo;
          </p>
          <div className="mt-8 w-16 h-0.5 bg-amber-400 mx-auto" />
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Our Story</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Adventure Beyond The Shore</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-8 text-gray-600 text-base sm:text-lg leading-[1.8]">
          <p>
            QuestAshore is all about encouraging cruise guests to adventure beyond the shore. We believe every port holds something extraordinary waiting to be discovered. And making each destination exciting and accessible with our bucket list experiences.
          </p>
          <p>
            Travel is a great teacher. Our founder experienced firsthand how inflated shore excursion pricing could stop curious travelers from truly exploring ports. That frustration sparked a vision: to create a better, meaningful, and more affordable discovery channel without ever compromising on quality.
          </p>
          <p>
            What started as a personal passion project has grown into a global network trusted by families, solos, and singles alike. Today, QuestAshore partners with vetted local guides across the South Pacific and beyond to deliver shore excursions that prioritise quality, safety, and cultural respect at transparent pier-side prices.
          </p>
        </div>
      </section>
      <section className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white rounded-3xl border border-gray-200 shadow-sm p-10 sm:p-14 lg:p-16">
            <div className="absolute -top-4 left-8 inline-block bg-amber-500 text-white text-xs font-bold uppercase tracking-[0.15em] px-5 py-1.5 rounded-full">
              Do More With Your Booking
            </div>
            <div className="mt-4 space-y-6 text-gray-600 text-base sm:text-lg leading-[1.8]">
              <p>
                A portion of every booking profit directly helps local causes, empowers small business owners, and betters communities across the ports we visit. From funding education programs in Vanuatu to supporting women-led enterprises in Fiji, your journey with us creates ripples of positive change.
              </p>
              <blockquote className="border-l-4 border-amber-400 pl-6 py-2 my-8">
                <p className="text-xl sm:text-2xl font-light italic text-gray-700 leading-relaxed uppercase tracking-wide">
                  &ldquo;IT IS EVERY MAN&rsquo;S OBLIGATION TO PUT BACK INTO THE WORLD AT LEAST THE EQUIVALENT OF WHAT HE TAKES OUT OF IT&rdquo;
                </p>
                <footer className="mt-2 text-sm text-gray-500">&mdash; Albert Einstein</footer>
              </blockquote>
              <p>
                Whether it&rsquo;s reef restoration in Lifou or school supplies in Port Vila, your booking helps sustain the very places you&rsquo;ve come to experience. Because the best adventures are the ones that give back.
              </p>
            </div>
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
