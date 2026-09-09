"use client";

import { useState } from "react";
import Counter from "./Counter";
import { useCurrency } from "@/lib/context/CurrencyContext";
import CurrencySwitcher from "@/components/CurrencySwitcher";

export default function BookingSidebar({
  title,
  destinationPort,
  showForm,
  showCheckout,
  showInfo,
  pricing,
}) {
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(1);
  const [bookingPolicyOpen, setBookingPolicyOpen] = useState(false);
  const [cancellationPolicyOpen, setCancellationPolicyOpen] = useState(false);
  const { formatPrice } = useCurrency();

  const item = pricing?.[0];
  const adultPrice = item?.adultPrice ?? 0;
  const childPrice = item?.childPrice ?? 0;

  const totalTourCost = adultCount * adultPrice + childCount * childPrice;
  const commitmentFeeToday = (adultCount + childCount) * 10;

  function openBookingModal() {
    window.dispatchEvent(
      new CustomEvent("openBookingModal", {
        detail: {
          excursionName: title || "",
          destinationPort: destinationPort || "",
          adultCount,
          childCount,
          commitmentFee: commitmentFeeToday,
          totalTourCost,
        },
      })
    );
  }

  return (
    <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 space-y-6 lg:sticky lg:top-6">
      <span className="text-sm font-semibold tracking-wider text-slate-900 uppercase block border-b border-slate-200 pb-2">
        BOOK THIS
      </span>
      <div className="flex justify-end -mt-2">
        <CurrencySwitcher />
      </div>

      {pricing && pricing.length > 0 && (
        <div className="space-y-3">
          {pricing.map((item, i) => {
            const adultLabel = item.adultPrice !== undefined
              ? `Per Adult ${formatPrice(item.adultPrice)}`
              : null;
            const childLabel = item.childPrice !== undefined
              ? (item.childPrice === 0
                  ? "Per Child 1-12y/o Free"
                  : `Per Child ${formatPrice(item.childPrice)} (6-12y/o)`)
              : null;
            return (
              <div key={i}>
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                  <span className="text-sm font-semibold text-slate-800">{adultLabel}</span>
                  <Counter value={adultCount} onChange={setAdultCount} />
                </div>
                {childLabel && (
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 mt-2">
                    <span className="text-sm font-semibold text-slate-800">{childLabel}</span>
                    <Counter value={childCount} onChange={setChildCount} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showCheckout && (
        <div className="space-y-3 pt-2">
          <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center text-sm text-slate-600">
              <span>
                Total Tour Cost ({adultCount} Adults, {childCount} Children)
              </span>
              <span className="font-semibold text-slate-900">{formatPrice(totalTourCost)}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium text-emerald-600 bg-emerald-50/50 p-2.5 rounded-lg">
              <span>Due Today (Commitment Fee)</span>
              <span className="font-bold">{formatPrice(commitmentFeeToday)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={openBookingModal}
            className="w-full bg-emerald-700 text-white font-medium py-3 rounded-xl hover:bg-emerald-600 transition-colors text-sm text-center cursor-pointer"
          >
            RESERVE NOW
          </button>
          <p className="text-xs text-slate-500">Price Tag Label: due today {formatPrice(commitmentFeeToday)}</p>
        </div>
      )}

      {showInfo && (
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setBookingPolicyOpen((o) => !o)}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-white text-left cursor-pointer"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">Booking Policy</span>
              <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${bookingPolicyOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {bookingPolicyOpen && (
              <div className="px-3 py-2.5 text-xs text-slate-500 leading-relaxed space-y-2 bg-white border-t border-slate-100">
                <p>To secure your booking, a small deposit as commitment fee per guest is required at the time of reservation.</p>
                <p>This fee covers administrative costs and confirms your place on the tour and is deducted from your total tour price.</p>
                <p>The remaining balance is payable before or on the day of your excursion.</p>
                <p>A reservation is not confirmed until the commitment fee has been made!</p>
                <p>The commitment fee is non refundable if the guest cancels or does not show up. If your cruise is unable to dock due to weather or port changes, the commitment fee will be refundable or transferred to another booking.</p>
              </div>
            )}
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setCancellationPolicyOpen((o) => !o)}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-white text-left cursor-pointer"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-red-500">Cancellation Policy</span>
              <svg className={`w-3.5 h-3.5 text-red-500 transition-transform ${cancellationPolicyOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {cancellationPolicyOpen && (
              <div className="px-3 py-2.5 text-xs text-slate-500 leading-relaxed space-y-2 bg-white border-t border-slate-100">
                <p>Please be informed that QuestAshore does not offer cash refunds for NO SHOW shore excursions reserved &amp; deposited for by guests.</p>
                <p>However, we understand the weather window and port changes situations, we offer the following options in that case:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>All deposits are non-refundable. You have the option to hold your deposit or full payment as credit or transfer it to a future experience or new guest to use with QuestAshore.</li>
                  <li>Cancellations made 4 days or more before the scheduled date are eligible for a transfer towards a new guest, new experience, or destination.</li>
                  <li>Cancellations made 3 days prior or same day of excursions will incur a 50% cancellation fee of the total payment/deposit. The remaining balance will be applied as credit towards a future excursion.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
