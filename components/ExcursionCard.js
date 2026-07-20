"use client";

const placeholders = [
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&h=400&fit=crop",
];

let imgCounter = 0;

function nextImg() {
  const url = placeholders[imgCounter % placeholders.length];
  imgCounter++;
  return url;
}

export default function ExcursionCard({ excursion, destinationPort, destinationId }) {
  const imgSrc = nextImg();

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col">
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={imgSrc}
          alt={excursion.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x400/0c4a6e/ffffff?text=${encodeURIComponent(excursion.name.substring(0, 20))}`;
          }}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-sm">
          <div className="text-xs font-bold text-sky-800">
            Adult <span className="text-base">${excursion.pricing.adult}</span>
          </div>
          <div className="text-xs font-bold text-sky-600">
            Child <span className="text-base">${excursion.pricing.child}</span>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-3">{excursion.name}</h3>

        {excursion.description && (
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">{excursion.description}</p>
        )}

        <ul className="space-y-1.5 mb-5 flex-1">
          {excursion.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {h}
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            const modal = document.getElementById("booking-modal");
            if (modal) {
              modal.dataset.excursion = excursion.name;
              modal.dataset.destination = destinationPort;
              modal.dataset.destinationId = destinationId;
              modal.dataset.requiresTime = String(!!excursion.requiresTime);
              modal.classList.remove("hidden");
              modal.classList.add("flex");
            }
          }}
          className="w-full py-3 px-6 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
