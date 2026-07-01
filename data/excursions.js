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
          "Enjoy a full day guided tour departing from Port-Vila, a scenic drive and tour through the local markets, duty free shops and the city centre",
          "Step into a traditional cultural village to discover the local customs of the islanders, arts and handcrafted creations",
          "Swim, unwind or simply relax at the stunning Blue Lagoon",
          "Spend time surrounded by nature as you swim in refreshing pools, take in stunning waterfall views, explore scenic walking trails in a peaceful tropical setting",
          "Savor an included lunch at a local venue, featuring a set menu inspired by the authentic island flavors",
        ],
      },
      {
        name: "Vila Tranquil/Snorkel Combo",
        pricing: { adult: 120, child: 60 },
        description:
          "Make the most of your time in Port-Vila with a quick escape to some of its most stunning spots — head to the Blue Lagoon for crystal-clear swimming and return to relax by gorgeous Iririki Island which reveal vibrant marine life in a peaceful natural setting, where you can snorkel right off the beach of calm, turquoise waters surrounded by natural beauty and end your day discovering the best souvenir shops and duty free shopping",
        highlights: [
          "Crystal-clear swimming at the Blue Lagoon",
          "Snorkeling at Iririki Island with vibrant marine life",
          "Relaxation on calm, turquoise waters surrounded by natural beauty",
          "Discover souvenir shops and duty free shopping",
        ],
      },
      {
        name: "Adventurous Splash",
        pricing: { adult: 180, child: 90 },
        description:
          "Experience the best of Efate in one unforgettable adventure combining land, sea and pure adrenaline.",
        highlights: [
          "Rope jumping and swimming at the stunning Blue Lagoon",
          "Inland adventure on a quad bike or unforgettable horse riding experience",
          "Scenic drive back to the city to explore local markets and duty free shops for your keepsake",
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
        description:
          "Snorkel in Noumea's clear waters and encounter sea turtles in their natural environment for a truly unforgettable experience, watch these gentle creatures glide gracefully through their natural habitat while enjoying a unique and memorable marine adventure. Tick this off your bucket list in Noumea.",
        requiresTime: true,
        highlights: [
          "Snorkel in Noumea's clear waters",
          "Encounter sea turtles in their natural environment",
          "Watch gentle creatures glide gracefully through their natural habitat",
          "A unique and memorable marine adventure — tick this off your bucket list",
        ],
      },
    ],
  },
  {
    id: "lifou",
    port: "Lifou, New Caledonia",
    country: "New Caledonia",
    overview:
      "The largest of the loyalty islands, Lifou lies some 118 miles to the northwest of New Caledonia. Today's visitors are drawn to the island's spectacular scenery, which ranges from dense tropical forest to dramatic cliffs towering above the crashing waves. Lifou's white-sand beaches are some of the finest to be found in the entire Pacific.",
    points_of_interest: ["Cliff of Jokin", "Vanilla Plantation", "Lueciba Beach"],
    excursions: [
      {
        name: "Lifou Scenic Heritage",
        pricing: { adult: 80, child: 40 },
        description:
          "Satisfy the senses during this captivating half day tour that begins with a scenic drive through Easo village, which boasted several traditional homes and flowering gardens.",
        highlights: [
          "Scenic drive through Easo village with traditional homes and flowering gardens",
          "Visit the spectacular Jokin cliffs where dramatic limestone cliffs rise above the turquoise Pacific Ocean",
          "Tour a local vanilla plantation to learn about cultivation and processing",
          "Unwind at Lueciba Beach with crystal-clear waters and soft white sand — swim, snorkel, or relax",
          "Keep an eye out for sea turtles and colourful tropical fish in the lagoon",
          "Local lunch featuring Lifou specialty coconut crab and other island meal of your choice",
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
        description:
          "Begin with a scenic drive through Lautoka, Fiji's sugar city, where you'll discover local landmarks and everyday island life. Visit the vibrant local market and experience the colors, aromas and fresh produce that make Fiji's markets so unique. Continue to the famous mud pools and hot spring, where you can enjoy a natural spa experience and learn why locals have treasured these therapeutic waters for generations. Next, stroll through the stunning Garden of the Sleeping Giant, home to lush tropical landscapes, tranquil walking paths and an impressive collection of orchids nestled beneath the surrounding mountains. End the day at the beautiful Crowne Plaza Resort, where you'll have time to relax and enjoy Fiji at your own pace. Take a refreshing swim in the pool, unwind by the beach or simply soak up the tropical atmosphere before returning to your ship. This excursion offers the perfect blend of sightseeing, culture, nature and relaxation — an ideal way to experience the best of Lautoka in a single day.",
        highlights: [
          "Scenic drive through Lautoka, Fiji's sugar city, with local landmarks and everyday island life",
          "Visit the vibrant local market with colors, aromas and fresh produce",
          "Natural spa experience at the famous mud pools and hot spring",
          "Stroll through the stunning Garden of the Sleeping Giant with orchid collections",
          "Relax and unwind at the beautiful Crowne Plaza Resort with pool and beach access",
        ],
      },
    ],
  },
  {
    id: "roatan",
    port: "Roatan, Honduras",
    country: "Honduras",
    overview:
      "Discover the beauty of Roatan — a premier cruise port in the Bay Islands of Honduras, renowned for its stunning coral reefs, white-sand beaches, and rich Garifuna culture.",
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
