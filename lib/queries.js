import { groq } from "next-sanity";

export const homePageQuery = groq`*[_type == "homePage"][0]{
  hero {
    title,
    subtitle,
    accentText,
    "backgroundImage": backgroundImage.asset->url,
    "mobileBackgroundImage": mobileBackgroundImage.asset->url,
    overlayOpacity,
    showSearch
  },
  destinationsSection {
    heading,
    subtitle
  },
  whyQuestAshore {
    heading,
    cards[] {
      title,
      text,
      icon
    }
  },
  testimonials {
    heading,
    subtitle,
    testimonials[] {
      name,
      isVerified,
      rating,
      quote,
      avatarInitials,
      avatarColor
    }
  },
  faqSection {
    heading,
    subtitle,
    faqs[] {
      question,
      answer
    }
  }
}
`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  hero {
    "backgroundImage": backgroundImage.asset->url,
    title,
    description
  },
  tabs[] {
    name,
    quote,
    body
  },
  whyChooseUs {
    eyebrow,
    heading,
    cards[] {
      title,
      text,
      icon
    }
  }
}
`;

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  hero {
    heading,
    description
  },
  info {
    eyebrow,
    heading,
    description,
    email,
    supportHours
  },
  form {
    successTitle,
    successText
  }
}
`;

export const groupExcursionsPageQuery = groq`*[_type == "groupExcursionsPage"][0]{
  hero {
    "backgroundImage": backgroundImage.asset->url,
    heading,
    subtitle
  },
  intro {
    heading,
    text
  },
  groupTypes[] {
    number,
    title,
    text,
    icon
  },
  formSection {
    eyebrow,
    heading,
    successTitle,
    successText
  },
  footerNote
}
`;

export const travelAgentPageQuery = groq`*[_type == "travelAgentPage"][0]{
  hero {
    "backgroundImage": backgroundImage.asset->url,
    heading
  },
  intro,
  perks {
    eyebrow,
    perks[] {
      number,
      title,
      text
    }
  },
  formSection {
    eyebrow,
    heading,
    successTitle,
    successText
  }
}
`;

export const destinationsPageQuery = groq`*[_type == "destinationsPage"][0]{
  eyebrow,
  heading,
  subtitle
}
`;

export const affiliateNetworkPageQuery = groq`*[_type == "affiliateNetworkPage"][0]{
  hero {
    "backgroundImage": backgroundImage.asset->url,
    heading
  },
  intro,
  howItWorks {
    eyebrow,
    heading,
    steps[] {
      number,
      title,
      text
    }
  },
  benefits {
    eyebrow,
    heading,
    benefits[] {
      title,
      text
    }
  },
  formSection {
    eyebrow,
    heading,
    successTitle,
    successText
  }
}
`;

export const regionPageBySlug = groq`*[_type == "regionPage" && region == $region][0]{
  region,
  hero {
    title,
    subtitle,
    accentText,
    "backgroundImage": backgroundImage.asset->url,
    "mobileBackgroundImage": mobileBackgroundImage.asset->url,
    overlayOpacity,
    showSearch
  }
}
`;

export const destinationsByRegion = groq`*[_type == "destination" && region == $region] | order(title asc){
  title,
  "slug": slug.current,
  region,
  image,
  badges
}
`;

export const destinationBySlug = groq`*[_type == "destination" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  region,
  country,
  image,
  badges,
  heroImage,
  heroLabel,
  overview,
  pointsOfInterest,
  excursions[] {
    name,
    image,
    description,
    highlights,
    adultPrice,
    childPrice
  }
}
`;

export const allDestinationSlugs = groq`*[_type == "destination" && defined(slug.current)]{
  "slug": slug.current
}
`;
