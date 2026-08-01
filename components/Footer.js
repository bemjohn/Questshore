import TrustpilotWidget from "@/components/TrustpilotWidget";

export default function Footer() {
  return (
    <footer className="bg-sky-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg font-bold">QuestAshore</p>
        <p className="text-sm text-sky-200 mt-1">Bucket List Experiences Beyond The Pier</p>
        <TrustpilotWidget />
        <p className="text-xs text-sky-300 mt-6">&copy; {new Date().getFullYear()} QuestAshore. All rights reserved.</p>
      </div>
    </footer>
  );
}
