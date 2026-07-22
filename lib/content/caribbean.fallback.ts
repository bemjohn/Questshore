export const caribbeanFallback = {
  heroBackgroundImage:
    "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1920&q=80",
  destinations: [
    {
      id: "roatan",
      title: "Roatan, Honduras",
      badges: ["Adventure", "Wildlife", "Beach"],
      image:
        "https://images.unsplash.com/photo-1590523741831-ab7e8b3f8d1c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "cozumel",
      title: "Cozumel, Mexico",
      badges: ["Marine", "History", "Culture"],
      image:
        "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80",
    },
  ],
};

export type CaribbeanContent = typeof caribbeanFallback;
