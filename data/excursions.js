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
          "Full-day guided tour departing from Port-Vila",
          "Scenic drive through local markets, duty-free shops, and city centre",
          "Visit a traditional cultural village",
          "Swim at the Blue Lagoon",
          "Explore refreshing waterfall pools and nature trails",
          "Included local lunch featuring set menu authentic island flavors",
        ],
      },
      {
        name: "Vila Tranquil/Snorkel Combo",
        pricing: { adult: 120, child: 60 },
        highlights: [
          "Quick escape featuring swimming at the Blue Lagoon",
          "Relaxation at Iririki Island with beachfront snorkeling over vibrant marine life",
          "Explore souvenir shops and duty-free shopping",
        ],
      },
      {
        name: "Adventurous Splash",
        pricing: { adult: 180, child: 90 },
        highlights: [
          "Action-packed Efate adventure combining land, sea, and adrenaline",
          "Rope jumping and swimming at the Blue Lagoon",
          "Quad bike or horseback riding inland",
          "Scenic drive back through local markets and duty-free shops",
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
        description: "Snorkel in clear waters to encounter gentle sea turtles gliding through their natural marine habitat. A true bucket-list marine adventure.",
        requiresTime: true,
        highlights: [
          "Snorkel in clear waters",
          "Encounter gentle sea turtles in their natural marine habitat",
          "A true bucket-list marine adventure",
        ],
      },
    ],
  },
  {
    id: "lifou",
    port: "Lifou, New Caledonia",
    country: "New Caledonia",
    overview:
      "The largest of the loyalty islands, lying 118 miles northwest of New Caledonia, featuring dense tropical forests, dramatic cliffs, and pristine white-sand beaches.",
    points_of_interest: ["Cliff of Jokin", "Vanilla Plantation", "Lueciba Beach"],
    excursions: [
      {
        name: "Lifou Scenic Heritage",
        pricing: { adult: 80, child: 40 },
        highlights: [
          "Captivating half-day tour starting through Easo village",
          "Visit the spectacular limestone Jokin cliffs for panoramic coastal views",
          "Continue to a local vanilla plantation to learn vine-to-pod processing",
          "Unwind, swim, and watch for sea turtles at Lueciba Beach",
          "Includes a local restaurant lunch featuring Lifou specialty coconut crab",
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
          "Scenic drive through Lautoka (\"Fiji's Sugar City\") and visit the vibrant local market",
          "Continue to famous therapeutic mud pools and hot springs for a natural spa experience",
          "Stroll through orchid trails at the Garden of the Sleeping Giant",
          "Unwind with a refreshing swim or beach relaxation at the Crowne Plaza Resort",
        ],
      },
    ],
  },
  {
    id: "roatan",
    port: "Roatan, Honduras",
    country: "Honduras",
    overview: "Discover the beauty of Roatan ? a premier cruise port in the Bay Islands of Honduras, renowned for its stunning coral reefs, white-sand beaches, and rich Garifuna culture.",
    points_of_interest: ["West Bay Beach", "Carambola Gardens", "Roatan Marine Park"],
    excursions: [],
  },
];

export function getDestinationById(id) {
  return destinations.find((d) => d.id === id) || null;
}

export function getDestinationsByCountry(country) {
  return destinations.filter((d) => d.country === country);
}

export const countries = [...new Set(destinations.map((d) => d.country))];
