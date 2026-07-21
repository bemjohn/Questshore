import { groq } from "next-sanity";

export const HOME_QUERY = groq`
  *[_type == "homePage" && _id == "homePage"][0]{
    "heroTitle": hero.title,
    "heroSubtitle": hero.subtitle,
    "heroImage": hero.image,
    "cards": featuredDestinations[]->{
      _id,
      title,
      slug,
      image
    },
    testimonials[]{
      _key,
      quote,
      author
    }
  }
`;

export const DESTINATIONS_QUERY = groq`
  *[_type == "destination"] | order(orderRank){
    _id,
    title,
    slug,
    country,
    "cardImage": cardImage,
    overview,
    points_of_interest,
    excursions[]{
      name,
      pricing,
      description,
      requiresTime,
      highlights
    }
  }
`;

export const DESTINATION_BY_SLUG_QUERY = groq`
  *[_type == "destination" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    country,
    "cardImage": cardImage,
    "heroImage": heroImage,
    overview,
    points_of_interest,
    excursions[]{
      name,
      pricing,
      description,
      requiresTime,
      highlights
    }
  }
`;

export const NAVIGATION_QUERY = groq`
  *[_type == "navigation" && _id == "mainNavigation"][0]{
    links[]{
      label,
      href,
      hasDropdown
    }
  }
`;
