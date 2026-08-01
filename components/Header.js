"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navFallback as navLinks } from "@/lib/content/navigation.fallback";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href) {
    return pathname === href;
  }

  function isDestinationsActive() {
    return pathname === "/destinations" || pathname.startsWith("/destinations/");
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="w-full flex items-center justify-between pl-8 pr-6 md:pl-12 md:pr-10 py-1 h-20">
        <Link href="/" className="shrink-0">
          <img
            src="/QuestAshore Logo.svg"
            alt="QuestAshore"
            className="h-14 w-auto sm:h-18 object-contain"
          />
        </Link>

          <nav className="flex max-[1000px]:hidden items-center gap-[60px]">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.label} className="relative group">
                    <Link href={link.href} className={`relative flex items-center gap-1 text-sm font-medium transition-colors duration-[250ms] py-5 -my-5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-sky-700 after:transition-all after:duration-[250ms] ${isDestinationsActive() ? "text-sky-700 after:w-full" : "text-gray-700 hover:text-sky-700 hover:after:w-full"}`}>
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isDestinationsActive() ? "" : "group-hover:rotate-180"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    <div className="absolute right-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                        <Link
                          href="/destinations/south-pacific"
                          className={`block px-4 py-2 text-sm transition-colors ${pathname === "/destinations/south-pacific" ? "bg-sky-50 text-sky-700 font-semibold" : "text-gray-700 hover:bg-sky-50 hover:text-sky-700"}`}
                        >
                          South Pacific
                        </Link>
                        <Link
                          href="/destinations/caribbean"
                          className={`block px-4 py-2 text-sm transition-colors ${pathname === "/destinations/caribbean" ? "bg-sky-50 text-sky-700 font-semibold" : "text-gray-700 hover:bg-sky-50 hover:text-sky-700"}`}
                        >
                          Caribbean Excursions
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-[250ms] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-sky-700 after:transition-all after:duration-[250ms] ${isActive(link.href) ? "text-sky-700 after:w-full" : "text-gray-700 hover:text-sky-700 hover:after:w-full"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            className="hidden max-[1000px]:inline-flex p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
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

        {menuOpen && (
          <div className="hidden max-[1000px]:block border-t border-gray-100 py-4 space-y-3">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.label} className="px-2 space-y-1">
                    <div className={`text-xs font-bold uppercase tracking-wider py-1 ${isDestinationsActive() ? "text-sky-700" : "text-gray-400"}`}>
                      {link.label}
                    </div>
                    <Link
                      href="/destinations/south-pacific"
                      className={`block pl-4 py-1.5 text-sm transition-colors duration-200 ${pathname === "/destinations/south-pacific" ? "text-sky-700 font-semibold" : "text-gray-600 hover:text-sky-700"}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      South Pacific
                    </Link>
                    <Link
                      href="/destinations/caribbean"
                      className={`block pl-4 py-1.5 text-sm transition-colors duration-200 ${pathname === "/destinations/caribbean" ? "text-sky-700 font-semibold" : "text-gray-600 hover:text-sky-700"}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      Caribbean Excursions
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`block px-2 py-2 text-sm font-medium transition-colors duration-200 ${isActive(link.href) ? "text-sky-700" : "text-gray-700 hover:text-sky-700"}`}
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
