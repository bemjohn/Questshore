import { client } from "@/lib/sanity";
import { homePageQuery } from "@/lib/queries";
import SiteHero from "@/components/SiteHero";
import SearchForm from "@/components/SearchForm";

const fallback = {
  backgroundImage:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
  title: "Make every destination memorable",
  accentText: "Shore Excursions",
  subtitle:
    "Curated bucket-list adventures waiting for you at every port of call.",
  overlayOpacity: 40,
  showSearch: true,
};

export default async function Hero() {
  let page;

  try {
    page = await client.fetch(homePageQuery);
  } catch {
    page = null;
  }

  const hero = page?.hero ?? fallback;

  return (
    <SiteHero
      backgroundImage={hero.backgroundImage || fallback.backgroundImage}
      mobileBackgroundImage={hero.mobileBackgroundImage}
      title={hero.title || fallback.title}
      accentText={hero.accentText || fallback.accentText}
      subtitle={hero.subtitle || fallback.subtitle}
      overlayOpacity={hero.overlayOpacity ?? fallback.overlayOpacity}
    >
      {hero.showSearch && <SearchForm />}
    </SiteHero>
  );
}
