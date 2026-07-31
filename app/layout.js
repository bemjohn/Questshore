import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import BookingModal from "@/components/BookingModal";
import NetlifyFormDetection from "@/components/NetlifyFormDetection";
import Providers from "./providers";
import { client } from "@/lib/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity/queries";
import { mergeSiteSettingsContent } from "@/lib/content/siteSettings.merge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QuestAshore — Bucket List Experiences Beyond The Pier",
  description:
    "Premium cruise shore excursions across the South Pacific. Book unforgettable adventures in Vanuatu, New Caledonia, and Fiji.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({ children }) {
  const sanityDoc = await client
    .fetch(SITE_SETTINGS_QUERY, {}, { next: { tags: ["siteSettings"] } })
    .catch(() => null);
  const { exchangeRate } = mergeSiteSettingsContent(sanityDoc);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers exchangeRate={exchangeRate}>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="bg-sky-900 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-lg font-bold">QuestAshore</p>
              <p className="text-sm text-sky-200 mt-1">Bucket List Experiences Beyond The Pier</p>
              <p className="text-xs text-sky-300 mt-4">&copy; {new Date().getFullYear()} QuestAshore. All rights reserved.</p>
            </div>
          </footer>
          <BookingModal />
          <NetlifyFormDetection />
        </Providers>
      </body>
    </html>
  );
}
