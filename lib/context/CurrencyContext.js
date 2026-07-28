"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";

const CurrencyContext = createContext(null);

export function CurrencyProvider({ exchangeRate, children }) {
  const [currency, setCurrency] = useState("AUD");

  const convertPrice = useCallback(
    (amountInUsd) => {
      if (currency === "AUD") {
        return Math.round(amountInUsd * exchangeRate);
      }
      return amountInUsd;
    },
    [currency, exchangeRate]
  );

  const formatPrice = useCallback(
    (amountInUsd) => {
      const converted = convertPrice(amountInUsd);
      return `$${converted}`;
    },
    [convertPrice]
  );

  const value = useMemo(
    () => ({ currency, setCurrency, convertPrice, formatPrice, exchangeRate }),
    [currency, convertPrice, formatPrice, exchangeRate]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
