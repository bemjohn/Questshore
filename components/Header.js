"use client";

import { useState } from "react";
import Link from "next/link";
import { destinations, countries } from "@/data/excursions";
import { navLinks } from "@/data/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col leading-tight shrink-0">
            <span className="text-xl font-extrabold tracking-wide text-sky-900">
              QuestAshore
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-gray-500 tracking-wider uppercase">
              Bucket List Experiences Beyond The Pier
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.label} className="relative group">
                    <Link href={link.href} className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-sky-700 transition-colors py-4 -my-4">
                      {link.label}
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    <div className="absolute right-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                        {countries.map((country) => {
                          const countryDests = destinations.filter((d) => d.country === country);
                          return (
                            <div key={country}>
                              <div className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                                {country}
                              </div>
                              {countryDests.map((dest) => (
                                <Link
                                  key={dest.id}
                                  href={`/destinations/${dest.id}`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                                >
                                  {dest.port}
                                </Link>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-sky-700 transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-3">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.label} className="px-2 space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400 py-1">
                      {link.label}
                    </div>
                    {destinations.map((dest) => (
                      <Link
                        key={dest.id}
                        href={`/destinations/${dest.id}`}
                        className="block pl-4 py-1.5 text-sm text-gray-600 hover:text-sky-700"
                        onClick={() => setMenuOpen(false)}
                      >
                        {dest.port}
                      </Link>
                    ))}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-2 py-2 text-sm font-medium text-gray-700 hover:text-sky-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
