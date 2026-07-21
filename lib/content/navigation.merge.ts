import { navFallback, type NavLink } from "./navigation.fallback";

export function mergeNavigation(sanity: any): NavLink[] {
  if (!sanity?.links || !Array.isArray(sanity.links) || sanity.links.length === 0) {
    return navFallback;
  }
  return sanity.links.map((l: any) => ({
    label: l.label || "Link",
    href: l.href || "/",
    hasDropdown: l.hasDropdown || false,
  }));
}
