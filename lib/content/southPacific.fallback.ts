export const southPacificFallback = {
  heroBackgroundImage:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
  destinations: [
    {
      id: "port-vila",
      title: "Port Vila, Vanuatu",
      badges: ["Adventure", "Culture", "Islands"],
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "noumea",
      title: "Noumea, New Caledonia",
      badges: ["Marine", "Wildlife"],
      image:
        "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "lifou",
      title: "Lifou, New Caledonia",
      badges: ["Scenic", "Heritage", "Beach"],
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "fiji",
      title: "Fiji Islands",
      badges: ["Culture", "Nature", "Relaxation"],
      image:
        "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80",
    },
  ],
};

export type SouthPacificContent = typeof southPacificFallback;
