export const homeFallback = {
  hero: {
    title: "Make every destination memorable",
    subtitle: "Curated bucket-list adventures waiting for you at every port of call.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
  },
  cards: [
    {
      id: "port-vila",
      title: "Port Vila, Vanuatu",
      slug: "port-vila",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      excursionsCount: 3,
    },
    {
      id: "noumea",
      title: "Noumea, New Caledonia",
      slug: "noumea",
      imageUrl: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&h=600&fit=crop",
      excursionsCount: 1,
    },
    {
      id: "lifou",
      title: "Lifou, New Caledonia",
      slug: "lifou",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      excursionsCount: 1,
    },
    {
      id: "fiji",
      title: "Fiji Island Excursion (Lautoka)",
      slug: "fiji",
      imageUrl: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=600&fit=crop",
      excursionsCount: 1,
    },
    {
      id: "roatan",
      title: "Roatan, Honduras",
      slug: "roatan",
      imageUrl: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&h=600&fit=crop",
      excursionsCount: 3,
    },
    {
      id: "cozumel",
      title: "Cozumel, Mexico",
      slug: "cozumel",
      imageUrl: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&h=600&fit=crop",
      excursionsCount: 3,
    },
  ],
  testimonials: [
    {
      id: "lisa",
      quote: "we loved our cruise excursions putten together by Omotola,our tour guide was super friendly, chilled &clean air conditioned van, it was so relaxing and we got to see so many beautiful places all in one day. Highly recommended.",
      author: "Lisa",
    },
    {
      id: "jodi",
      quote: "Highly recommend Omotola and her team,we had the best day, we were able to see so many sights with our small group size and it was amazing value. Great tour.",
      author: "Jodi",
    },
  ],
};

export type HomeContent = typeof homeFallback;
