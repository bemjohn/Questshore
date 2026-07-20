import { client } from "@/lib/sanity";
import { heroByPage } from "@/lib/queries";
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
  let hero;

  try {
    hero = await client.fetch(heroByPage, { page: "home" });
  } catch {
    hero = null;
  }

  const data = hero ?? fallback;

  return (
    <SiteHero
      backgroundImage={data.backgroundImage || fallback.backgroundImage}
      mobileBackgroundImage={data.mobileBackgroundImage}
      title={data.title || fallback.title}
      accentText={data.accentText || fallback.accentText}
      subtitle={data.subtitle || fallback.subtitle}
      overlayOpacity={data.overlayOpacity ?? fallback.overlayOpacity}
    >
      {data.showSearch && <SearchForm />}
    </SiteHero>
  );
}
