#!/usr/bin/env node

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Load .env.local for SANITY_STUDIO_PROJECT_ID / DATASET ──────────
try {
  const envPath = resolve(__dirname, "..", ".env.local");
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const t = line.trim();
    if (t && !t.startsWith("#")) {
      const i = t.indexOf("=");
      if (i > 0) {
        let k = t.slice(0, i).trim();
        let v = t.slice(i + 1).trim();
        if (
          (v.startsWith('"') && v.endsWith('"')) ||
          (v.startsWith("'") && v.endsWith("'"))
        )
          v = v.slice(1, -1);
        if (!process.env[k]) process.env[k] = v;
      }
    }
  }
} catch {}

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || "s6n94hs6";
const dataset =
  process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("ERROR: SANITY_WRITE_TOKEN environment variable is required.");
  console.error("");
  console.error("  1. Create a token at https://sanity.io/manage");
  console.error("  2. Run:");
  console.error(
    '     $env:SANITY_WRITE_TOKEN="sktoken..." ; node scripts/seed-destinations.mjs'
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2024-01-01",
});

function shortId() {
  return crypto.randomUUID().slice(0, 8);
}

// ── Upload an image from a remote URL → Sanity asset ───────────────
async function uploadImage(url, filename) {
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`Failed to fetch ${url.slice(0, 80)}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buf, {
    filename,
    contentType: res.headers.get("content-type") || "image/jpeg",
  });
  return asset;
}

// ── Destination seed data (mirrors lib/content/destinations.fallback.ts) ──
const destinationsData = [
  {
    slug: "port-vila",
    title: "Port Vila, Vanuatu",
    region: "South Pacific",
    country: "Vanuatu",
    cardImageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=800&fit=crop",
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
    slug: "noumea",
    title: "Noumea, New Caledonia",
    region: "South Pacific",
    country: "New Caledonia",
    cardImageUrl:
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&h=600&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1920&h=800&fit=crop",
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
    slug: "lifou",
    title: "Lifou, New Caledonia",
    region: "South Pacific",
    country: "New Caledonia",
    cardImageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=800&fit=crop",
    overview:
      "The largest of the loyalty islands, Lifou lies some 118 miles to the northwest of New Caledonia. Today's visitors are drawn to the island's spectacular scenery, which ranges from dense tropical forest to dramatic cliffs towering above the crashing waves. Lifou's white-sand beaches are some of the finest to be found in the entire Pacific.",
    pointsOfInterest: ["Cliff of Jokin", "Vanilla Plantation", "Lueciba Beach"],
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
    slug: "fiji",
    title: "Fiji Island Excursion (Lautoka)",
    region: "South Pacific",
    country: "Fiji",
    cardImageUrl:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=600&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1920&h=800&fit=crop",
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
    slug: "roatan",
    title: "Roatan, Honduras",
    region: "Caribbean",
    country: "Honduras",
    cardImageUrl:
      "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&h=600&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1920&h=800&fit=crop",
    overview:
      "Discover the beauty of Roatan — a premier cruise port in the Bay Islands of Honduras, renowned for its stunning coral reefs, white-sand beaches, and rich Garifuna culture.",
    pointsOfInterest: [
      "West Bay Beach",
      "Carambola Gardens",
      "Roatan Marine Park",
    ],
    excursions: [
      {
        name: "Roatan By Land And Sea",
        pricing: { adult: 68 },
        highlights: [
          "Explore local villages, historic landmarks, and scenic lookout points on a guided island tour",
          "Set sail on a relaxing small-group cruise departing from West End Beach",
          "Snorkel the world's second-largest barrier reef alongside an experienced guide",
          "Watch playful dolphins during a visit to the Institute of Marine Science",
          "Unwind with free time on the beach before returning to your ship",
        ],
      },
      {
        name: "Day Pass at a Private Island Beach Resort & Orphanage Visit",
        pricing: { adult: 48 },
        highlights: [
          "Experience the beauty of Roatan's community and culture on the unique Roatan Orphanage tour — an opportunity to give back to the community, not to be missed",
          "Unwind at Bradey Cay's Island after your visit to the orphanage",
          "Benefit from roundtrip transportation and a certified friendly bilingual guide",
        ],
      },
      {
        name: "Roatan Animal Sanctuary & Beach Break",
        pricing: { adult: 74 },
        description:
          "This tour combines exploration and relaxation in a tropical paradise. Travel in comfort with our experienced local guide, who'll offer rich insights into Roatan's history and culture.",
        highlights: [
          "Visit unique attractions such as an iguana farm",
          "Explore the Sloth and Monkey Sanctuary",
          "Stroll through botanical gardens",
          "End the day lounging on a private all-inclusive island with peaceful scenery",
        ],
      },
    ],
  },
  {
    slug: "cozumel",
    title: "Cozumel, Mexico",
    region: "Caribbean",
    country: "Mexico",
    cardImageUrl:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&h=600&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1920&h=800&fit=crop",
    overview:
      "Discover the magic of Cozumel — a Caribbean island paradise off the Yucatán Peninsula, world-famous for its crystal-clear waters, magnificent coral reefs, and rich Mayan heritage.",
    pointsOfInterest: [
      "Chankanaab National Marine Park",
      "San Miguel de Cozumel",
      "Mayan Ruins",
    ],
    excursions: [
      {
        name: "Dolphin Swim Encounter at Chankanaab Marine Park",
        pricing: { adult: 110, child: 0 },
        description:
          "Chankanaab National Marine Park in Cozumel is the perfect setting for a memorable, bucket list dolphin experience. The Dolphin Connection program is designed to create a fun and personal connection with one of the ocean's most fascinating animals in a safe and respectful environment.",
        highlights: [
          "Experience an interactive dolphin swim in Cozumel at Chankanaab National Marine Park, one of the island's top shore excursion destinations",
          "Enjoy up to 40 minutes in the water with one dolphin in a small group of up to 8 guests, creating a more personal and immersive experience",
          "Take part in up to 18 dolphin behaviors, including a kiss, fin shake, Dolphin Embrace, Heart to Heart, and Ocean Echo",
          "Bonus experiences: 10-minute manatee meet and greet and a sea lion presentation",
          "Enjoy access to Chankanaab Park facilities including buffet, open bar, pool, and sea lion presentation",
        ],
      },
      {
        name: "Manatee Encounter",
        pricing: { adult: 79 },
        description:
          "There's swimming, and then there's swimming with manatees! The Manatee Swim and Chankanaab Park excursion will be the absolute highlight of your Cozumel visit. Submerge yourself in the underwater world of the manatee.",
        highlights: [
          "Swim with and feed delightful manatees during a hands-on encounter",
          "Enjoy unlimited access to Chankanaab National Marine Park",
          "Attend a sea lion show and dolphin presentation",
          "Take a self-guided archaeological tour",
          "Leave with lifetime memories and professional underwater photos",
        ],
      },
      {
        name: "Explore Cozumel Historical & Beach Break",
        pricing: { adult: 65 },
        description:
          "Want to combine a historical experience with beach fun? This is for you. Explore the Cozumel City tour with its historical center and flea market, iconic monuments, and a visit to a Mayan village for a tasting of tequila, organic chocolate, and a pre-Hispanic taco.",
        highlights: [
          "Cozumel City tour visiting historical center and flea market",
          "Iconic monuments and photo of the Cozumel sign",
          "Visit to a Mayan village for a tasting of tequila, organic chocolate, a pre-Hispanic taco made with seeds, and a complimentary beverage",
          "Visit to the Mayan temple where the first official Catholic mass was celebrated in 1518",
          "Visit to a black coral factory, Cozumel's only local craft",
          "Beach club access includes all amenities: lounge chairs, shade, pool, showers, restrooms, and Wi-Fi",
        ],
      },
    ],
  },
];

// ── Track created destination IDs ───────────────────────────────────
const createdIds = {}; // slug → _id

// ── Step 1: Create/publish each destination document ────────────────
console.log("── Step 1: Creating destination documents ──");

for (const dest of destinationsData) {
  // Idempotency check: does a doc with this slug already exist?
  const existing = await client.fetch(
    `*[_type == "destination" && slug.current == $slug][0]{_id}`,
    { slug: dest.slug }
  );

  const fixedId = `destination-${dest.slug}`;

  if (existing) {
    console.log(`  ↪ "${dest.title}" already exists (${existing._id}), skipping`);
    createdIds[dest.slug] = existing._id;
    continue;
  }

  console.log(`  Creating "${dest.title}" (${fixedId})…`);

  // Upload images
  console.log(`    Uploading card image…`);
  const cardAsset = await uploadImage(
    dest.cardImageUrl,
    `${dest.slug}-card.jpg`
  );
  console.log(`    Uploading hero image…`);
  const heroAsset = await uploadImage(
    dest.heroImageUrl,
    `${dest.slug}-hero.jpg`
  );

  // Build excursion array
  const excursions = dest.excursions.map((exc) => ({
    _key: shortId(),
    name: exc.name,
    pricing: { adult: exc.pricing.adult, child: exc.pricing.child ?? null },
    description: exc.description || "",
    requiresTime: exc.requiresTime ?? false,
    highlights: exc.highlights,
  }));

  // Create & publish the document (fixed ID → createOrReplace publishes directly)
  const doc = await client.createOrReplace({
    _id: fixedId,
    _type: "destination",
    title: dest.title,
    slug: { _type: "slug", current: dest.slug },
    region: dest.region,
    country: dest.country,
    cardImage: {
      _type: "image",
      asset: { _type: "reference", _ref: cardAsset._id },
    },
    heroImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroAsset._id },
    },
    ...(dest.overview ? { overview: dest.overview } : {}),
    ...(dest.pointsOfInterest
      ? { points_of_interest: dest.pointsOfInterest }
      : {}),
    excursions,
  });

  createdIds[dest.slug] = doc._id;
  console.log(`    ✅ Created & published as ${doc._id}`);
}

// ── Step 2: Build reference arrays for singleton pages ──────────────
console.log("\n── Step 2: Updating singleton page reference arrays ──");

function buildRefs(slugs) {
  return slugs.map((s) => ({
    _key: shortId(),
    _type: "reference",
    _ref: createdIds[s],
  }));
}

const allSlugs = [
  "port-vila",
  "noumea",
  "lifou",
  "fiji",
  "roatan",
  "cozumel",
];
const southPacificSlugs = ["port-vila", "noumea", "lifou", "fiji"];
const caribbeanSlugs = ["roatan", "cozumel"];

const pageUpdates = [
  { id: "homePage", type: "homePage", field: "featuredDestinations", refs: allSlugs },
  { id: "southPacificPage", type: "southPacificPage", field: "destinations", refs: southPacificSlugs },
  { id: "caribbeanPage", type: "caribbeanPage", field: "destinations", refs: caribbeanSlugs },
  { id: "travelAgentPage", type: "travelAgentPage", field: "featuredDestinations", refs: allSlugs },
];

for (const page of pageUpdates) {
  console.log(`  Updating ${page.id}.${page.field}…`);

  // Fetch existing document to preserve other fields
  let existing = {};
  try {
    const doc = await client.getDocument(page.id);
    if (doc) {
      const { _id, _type, _rev, _createdAt, _updatedAt, ...rest } = doc;
      existing = rest;
    }
  } catch {}

  await client.createOrReplace({
    _id: page.id,
    _type: page.type,
    ...existing,
    [page.field]: buildRefs(page.refs),
  });

  console.log(
    `    ✅ ${page.id} — ${page.refs.length} reference(s) set`
  );
}

// ── Summary ─────────────────────────────────────────────────────────
console.log("\n── Summary ──");
console.log(`  Destinations processed: ${Object.keys(createdIds).length}/6`);
for (const slug of allSlugs) {
  console.log(`    ${slug} → ${createdIds[slug]}`);
}
console.log(`  Singleton pages updated: ${pageUpdates.length}`);
for (const p of pageUpdates) {
  console.log(`    ${p.id}: ${p.refs.length} ref(s)`);
}
console.log("\n✅ Done. Open sanity.io/studio to verify.");
