"use client";

import { useCurrency } from "@/lib/context/CurrencyContext";

export default function PriceDisplay({ amountInAud, className }) {
  const { formatPrice } = useCurrency();
  return <span className={className}>{formatPrice(amountInAud)}</span>;
}
