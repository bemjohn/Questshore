"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";

const CurrencyContext = createContext(null);

export function CurrencyProvider({ exchangeRate, children }) {
  const [currency, setCurrency] = useState("AUD");

  const convertPrice = useCallback(
    (amountInAud) => {
      if (currency === "USD") {
        return Math.round(amountInAud / exchangeRate);
      }
      return amountInAud;
    },
    [currency, exchangeRate]
  );

  const formatPrice = useCallback(
    (amountInAud) => {
      const prefix = currency === "AUD" ? "AUD $" : "USD $";
      const converted = convertPrice(amountInAud);
      return `${prefix}${converted}`;
    },
    [convertPrice, currency]
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
