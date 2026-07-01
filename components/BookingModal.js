"use client";

import { useState, useEffect } from "react";

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    cruiseShip: "",
    tourDate: "",
    timeSlot: "",
    adults: 1,
    children: 0,
    excursionName: "",
    destinationPort: "",
    destinationId: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "Escape") closeModal();
    }
    if (open) {
      document.addEventListener("keydown", handleKeydown);
      document.body.style.overflow = "hidden";
    }
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

  useEffect(() => {
    const modal = document.getElementById("booking-modal");
    if (!modal) return;
    const observer = new MutationObserver(() => {
      const isHidden = modal.classList.contains("hidden");
      setOpen(!isHidden);
      if (!isHidden) {
        const name = modal.dataset.excursion || "";
        const dest = modal.dataset.destination || "";
        const destId = modal.dataset.destinationId || "";
        const requiresTime = modal.dataset.requiresTime === "true";
        setForm((prev) => ({
          ...prev,
          excursionName: name,
          destinationPort: dest,
          destinationId: destId,
          timeSlot: requiresTime ? prev.timeSlot : "",
        }));
      }
    });
    observer.observe(modal, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);

    try {
      const body = new URLSearchParams({ "form-name": "booking-inquiry", ...form });
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (res.status === 200) {
        setSubmitted(true);
      } else {
        throw new Error("Form submission failed");
      }
    } catch {
      setError(true);
    }
  }

  if (!open) return null;

  const requiresTime = form.excursionName === "A Swim With Sea Turtle Experience";

  return (
    <div
      id="booking-modal"
      className="hidden fixed inset-0 z-[100] items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Book Your Excursion</h2>
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">Booking Inquiry Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Thank you! Your excursion booking request has been received. We will contact you shortly to confirm
              availability.
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4" name="booking-inquiry">
            <input type="hidden" name="form-name" value="booking-inquiry" />
            <input type="hidden" name="excursionName" value={form.excursionName || ""} />
            <input type="hidden" name="destinationPort" value={form.destinationPort || ""} />
            <input type="hidden" name="destinationId" value={form.destinationId || ""} />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  First Name *
                </label>
                <input
                  required
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
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
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Cruise Ship Details *
              </label>
              <input
                required
                name="cruiseShip"
                value={form.cruiseShip}
                onChange={handleChange}
                placeholder="e.g. Quantum of the Seas"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Tour Date *
                </label>
                <input
                  required
                  type="date"
                  name="tourDate"
                  value={form.tourDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Preferred Time {requiresTime ? "*" : ""}
                </label>
                <select
                  name="timeSlot"
                  value={form.timeSlot}
                  onChange={handleChange}
                  required={requiresTime}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                >
                  <option value="">Select time</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="08:30">08:30</option>
                  <option value="09:00">09:00</option>
                  <option value="09:30">09:30</option>
                  <option value="10:00">10:00</option>
                  <option value="10:30">10:30</option>
                  <option value="11:00">11:00</option>
                  <option value="11:30">11:30</option>
                  <option value="12:00">12:00</option>
                  <option value="12:30">12:30</option>
                  <option value="13:00">13:00</option>
                  <option value="13:30">13:30</option>
                  <option value="14:00">14:00</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Adults *
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900">{form.adults}</span>
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, adults: p.adults + 1 }))}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Children
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, children: Math.max(0, p.children - 1) }))}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900">{form.children}</span>
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, children: Math.max(0, p.children + 1) }))}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
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
