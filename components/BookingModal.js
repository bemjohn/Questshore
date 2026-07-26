"use client";

import { useState, useEffect } from "react";

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    preferredDate: "",
    numberOfGuests: 2,
    excursionName: "",
    destinationPort: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    function handleOpen(e) {
      const detail = e.detail || {};
      setForm((prev) => ({
        ...prev,
        fullName: "",
        email: "",
        preferredDate: "",
        numberOfGuests: 2,
        excursionName: detail.excursionName || "",
        destinationPort: detail.destinationPort || "",
      }));
      setSubmitted(false);
      setError(false);
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
    setSubmitted(false);
    setError(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    try {
      const formData = new FormData(e.target);
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });
      setSubmitted(true);
    } catch {
      setError(true);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Book This Excursion</h2>
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

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Inquiry Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your interest! We will contact you shortly to confirm availability and answer any questions.
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4" name="book-excursion">
            <input type="hidden" name="form-name" value="book-excursion" />
            <input type="hidden" name="excursionName" value={form.excursionName || ""} />
            <input type="hidden" name="destinationPort" value={form.destinationPort || ""} />

            {form.excursionName && (
              <div className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold text-sky-700 uppercase tracking-wider">Excursion</p>
                <p className="text-sm font-medium text-sky-900 mt-0.5">{form.excursionName}</p>
                {form.destinationPort && (
                  <p className="text-xs text-sky-600 mt-0.5">{form.destinationPort}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Full Name *
              </label>
              <input
                required
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Email *
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
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Number of Guests *
              </label>
              <input
                required
                type="number"
                name="numberOfGuests"
                min="1"
                value={form.numberOfGuests}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            <p className="text-xs text-gray-400">
              Your booking inquiry will be sent directly to our team. We&apos;ll respond within 24 hours.
            </p>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Submit Booking Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
