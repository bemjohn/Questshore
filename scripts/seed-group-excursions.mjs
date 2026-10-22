#!/usr/bin/env node

import { getCliClient } from "sanity/cli";
import crypto from "crypto";

const client = getCliClient({ apiVersion: "2024-01-01" });
const DOC_ID = "groupExcursionsPage";

const shortId = () => crypto.randomUUID().slice(0, 8);

const experiences = [
  {
    order: "01",
    title: "Family Groups",
    description:
      "Create unforgettable memories with the people who matter most. Whether you're planning a family reunion, celebrating a birthday or anniversary, or simply enjoying a cruise together, we'll design an itinerary that caters to all ages and interests. From relaxing beach escapes to cultural sightseeing and exciting adventures, our experiences ensure everyone—from children to grandparents—has an incredible day ashore.",
    imageUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    alt: "Family group enjoying time together on vacation",
    reversed: false,
  },
  {
    order: "02",
    title: "Corporate Groups",
    description:
      "Strengthen relationships and inspire your team with professionally organized shore excursions. Whether you're hosting clients, rewarding employees, or planning a company retreat, we create experiences that balance leisure, networking, and team building. We take care of the planning and logistics so your group can focus on enjoying the destination.",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    alt: "Corporate team collaborating together",
    reversed: true,
  },
  {
    order: "03",
    title: "Community & Social Groups",
    description:
      "Travel is even more meaningful when shared with like-minded people. We love working with community groups of all kinds, including solo travel communities, singles groups, mums’ groups, alumni associations, church groups, hobby clubs, Lgbtq+, wellness retreats, sports teams, and social organizations. Whether your goal is relaxation, adventure, cultural discovery, or simply spending quality time together, we’ll create an experience that reflects your group’s interests and brings everyone together.",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
    alt: "Community group of friends socializing together",
    reversed: false,
  },
  {
    order: "04",
    title: "Friends & Private Groups",
    description:
      "Whether it's a birthday celebration, bachelor or bachelorette getaway, graduation trip, or just a chance to reconnect with friends, we'll help you make the most of your time ashore. Enjoy a personalized itinerary, flexible scheduling, and memorable experiences designed exclusively for your group, without the crowds or rigid schedules of large tour operators.",
    imageUrl:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    alt: "Friends celebrating together on a private getaway",
    reversed: true,
  },
];

async function uploadImage(url, filename) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buffer, {
    filename,
    contentType: res.headers.get("content-type") || "image/jpeg",
  });
}

async function getOrUploadImage(exp) {
  const filename = `group-experience-${exp.order}.jpg`;
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}`,
    { filename }
  );
  if (existing?._id) {
    console.log(`  Reusing existing asset: ${existing._id}`);
    return existing;
  }
  console.log(`  Uploading ${filename}…`);
  return uploadImage(exp.imageUrl, filename);
}

async function main() {
  const items = [];

  for (const exp of experiences) {
    console.log(`${exp.order} — ${exp.title}`);
    const asset = await getOrUploadImage(exp);
    items.push({
      _key: shortId(),
      _type: "groupExperience",
      order: exp.order,
      title: exp.title,
      description: exp.description,
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      },
      alt: exp.alt,
      reversed: exp.reversed,
    });
    console.log(`  Using asset: ${asset._id}`);
  }

  await client.createIfNotExists({
    _id: DOC_ID,
    _type: "groupExcursionsPage",
  });

  await client.patch(DOC_ID).set({ groupExperiences: items }).commit();

  const updated = await client.fetch(
    `*[_id == $id][0]{"count": count(groupExperiences), "refs": groupExperiences[].image.asset._ref}`,
    { id: DOC_ID }
  );
  console.log(
    `\n✅ ${DOC_ID}.groupExperiences seeded: ${updated?.count ?? 0} cards, ${updated?.refs?.length ?? 0} image refs.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
