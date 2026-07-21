import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/lib/sanity/client";
import type { Image } from "sanity";

const builder = createImageUrlBuilder(client);

export function urlForString(source: Image | undefined | null, width = 1600) {
  if (!source) return null;
  try {
    return builder.image(source).width(width).auto("format").url();
  } catch {
    return null;
  }
}
