import { groq } from "next-sanity";

export const heroByPage = groq`*[_type == "heroPage" && page == $page][0]{
  title,
  subtitle,
  accentText,
  overlayOpacity,
  showSearch,
  "backgroundImage": backgroundImage.asset->url,
  "mobileBackgroundImage": mobileBackgroundImage.asset->url,
}
`;
