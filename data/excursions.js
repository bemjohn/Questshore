export const destinations = [
  {
    id: "port-vila",
    port: "Port Vila, Vanuatu",
    country: "Vanuatu",
    excursions: [
      {
        name: "Vila Signature",
        pricing: { adult: 90, child: 45 },
        highlights: [
          "Full day guided tour",
          "Local markets & duty free shops",
          "City centre tour",
          "Traditional cultural village",
          "Blue Lagoon swim",
          "Waterfall views",
          "Included local lunch",
        ],
      },
      {
        name: "Vila Tranquil/Snorkel Combo",
        pricing: { adult: 120, child: 60 },
        highlights: [
          "Blue Lagoon swimming",
          "Iririki Island relaxation",
          "Snorkeling off turquoise water beaches",
          "Souvenir & duty free shopping",
        ],
      },
      {
        name: "Adventurous Splash",
        pricing: { adult: 180, child: 90 },
        highlights: [
          "Rope jumping/swimming at Blue Lagoon",
          "Inland quad bike or horse riding adventure",
          "Scenic drive back to the city",
          "Local markets & duty free shopping",
        ],
      },
    ],
  },
  {
    id: "noumea",
    port: "Noumea, New Caledonia",
    country: "New Caledonia",
    excursions: [
      {
        name: "A Swim With Sea Turtle Experience",
        pricing: { adult: 70, child: 35 },
        highlights: [
          "Snorkel in clear waters",
          "Encounter sea turtles in natural habitat",
          "Bucket list marine adventure",
        ],
      },
    ],
  },
  {
    id: "lifou",
    port: "Lifou, New Caledonia",
    country: "New Caledonia",
    overview:
      "The largest of the loyalty islands, featuring spectacular scenery ranging from dense tropical forests to dramatic cliffs towering above crashing waves with fine white-sand beaches.",
    points_of_interest: ["Cliff of Jokin", "Vanilla Plantation", "Lueciba Beach"],
    excursions: [
      {
        name: "Lifou New Caledonia Excursion",
        pricing: { adult: 80, child: 40 },
        highlights: [
          "Scenic drive through Easo village",
          "Spectacular Jokin cliffs coastal views",
          "Local vanilla plantation cultivation tour",
          "Swim, snorkel, or relax at Lueciba beach",
          "Local restaurant lunch featuring specialty coconut crab",
        ],
      },
    ],
  },
  {
    id: "fiji",
    port: "Fiji Island Excursion (Lautoka)",
    country: "Fiji",
    excursions: [
      {
        name: "Lautoka Essentielle",
        pricing: { adult: 80, child: 40 },
        highlights: [
          "Scenic drive through Lautoka (Sugar City)",
          "Vibrant local market colors & fresh produce",
          "Famous mud pools & hot springs natural spa",
          "Garden of the Sleeping Giant orchid collection",
          "Relaxation & swimming at Crowne Plaza Resort",
        ],
      },
    ],
  },
];

export function getDestinationById(id) {
  return destinations.find((d) => d.id === id) || null;
}

export function getDestinationsByCountry(country) {
  return destinations.filter((d) => d.country === country);
}

export const countries = [...new Set(destinations.map((d) => d.country))];
