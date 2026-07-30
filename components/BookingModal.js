"use client";

import { useState, useEffect } from "react";

const PAYPAL_URL = "https://www.paypal.com/paypalme/QuestAshore?country.x=AU&locale.x=en_AU";

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    preferredDate: "",
    shipDetails: "",
    excursionName: "",
    destinationPort: "",
    adultCount: 1,
    childCount: 1,
    commitmentFee: 0,
    totalTourCost: 0,
  });

  useEffect(() => {
    function handleOpen(e) {
      const detail = e.detail || {};
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        preferredDate: "",
        shipDetails: "",
        excursionName: detail.excursionName || "",
        destinationPort: detail.destinationPort || "",
        adultCount: detail.adultCount ?? 1,
        childCount: detail.childCount ?? 1,
        commitmentFee: detail.commitmentFee ?? 0,
        totalTourCost: detail.totalTourCost ?? 0,
      });
      setStep(1);
      setOpen(true);
    }
    window.addEventListener("openBookingModal", handleOpen);
    return () => window.removeEventListener("openBookingModal", handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleKeydown(e) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", handleKeydown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeModal() {
    setOpen(false);
    setStep(1);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handlePayPal() {
    window.open(PAYPAL_URL, "_blank", "noopener,noreferrer");
  }

  if (!open) return null;

  const today = new Date().toISOString().split("T")[0];
  const totalGuests = form.adultCount + form.childCount;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Back"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h2 className="text-xl font-bold text-gray-900">
              {step === 1 && "Booking Summary"}
              {step === 2 && "Your Details"}
              {step === 3 && "Complete Payment"}
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 pt-4 pb-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                s === step ? "bg-sky-600" : s < step ? "bg-emerald-400" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Deposit Summary */}
        {step === 1 && (
          <div className="p-6 space-y-5">
            {form.excursionName && (
              <div className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold text-sky-700 uppercase tracking-wider">Excursion</p>
                <p className="text-sm font-medium text-sky-900 mt-0.5">{form.excursionName}</p>
                {form.destinationPort && (
                  <p className="text-xs text-sky-600 mt-0.5">{form.destinationPort}</p>
                )}
              </div>
            )}

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Guests</span>
                <span className="font-medium text-slate-900">
                  {form.adultCount} Adult{form.adultCount !== 1 ? "s" : ""}
                  {form.childCount > 0 && `, ${form.childCount} Child${form.childCount !== 1 ? "ren" : ""}`}
                </span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Total Tour Cost</span>
                <span className="font-semibold text-slate-900">${form.totalTourCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-emerald-600 bg-emerald-50/50 p-2.5 rounded-lg -mx-1">
                <span>Due Today (Commitment Fee)</span>
                <span className="font-bold">${form.commitmentFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <p className="text-xs text-amber-800 leading-relaxed">
                <span className="font-semibold">Weather Refund Policy: </span>
                If your cruise is unable to dock due to weather or port changes, the commitment fee will be refundable or transferred to another booking.
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 px-6 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Continue to Booking Details
            </button>
          </div>
        )}

        {/* Step 2: Customer Details */}
        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(3);
            }}
            className="p-6 space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  First Name *
                </label>
                <input
                  required
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Last Name *
                </label>
                <input
                  required
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Email Address *
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email address"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Preferred Date *
              </label>
              <input
                required
                type="date"
                name="preferredDate"
                value={form.preferredDate}
                onChange={handleChange}
                min={today}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Ship Details
              </label>
              <input
                name="shipDetails"
                value={form.shipDetails}
                onChange={handleChange}
                placeholder="e.g. Carnival Splendor"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </form>
        )}

        {/* Step 3: Payment Hand-off */}
        {step === 3 && (
          <div className="p-6 space-y-5">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
              {form.excursionName && (
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Excursion</span>
                  <span className="font-medium text-slate-900">{form.excursionName}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-slate-600">
                <span>Name</span>
                <span className="font-medium text-slate-900">{form.firstName} {form.lastName}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Email</span>
                <span className="font-medium text-slate-900">{form.email}</span>
              </div>
              {form.preferredDate && (
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Date</span>
                  <span className="font-medium text-slate-900">{form.preferredDate}</span>
                </div>
              )}
              {form.shipDetails && (
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Ship</span>
                  <span className="font-medium text-slate-900">{form.shipDetails}</span>
                </div>
              )}
              <div className="border-t border-slate-200 pt-2 mt-2">
                <div className="flex justify-between text-sm font-medium text-emerald-600">
                  <span>Due Today (Commitment Fee)</span>
                  <span className="font-bold">${form.commitmentFee.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayPal}
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
              </svg>
              Pay with PayPal
            </button>

            <p className="text-xs text-gray-400 text-center">
              After payment, your booking will be confirmed. You can close this window.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
