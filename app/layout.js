import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import BookingModal from "@/components/BookingModal";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
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
      </body>
    </html>
  );
}
