"use client";

import { CurrencyProvider } from "@/lib/context/CurrencyContext";

export default function Providers({ exchangeRate, children }) {
  return (
    <CurrencyProvider exchangeRate={exchangeRate}>
      {children}
    </CurrencyProvider>
  );
}
