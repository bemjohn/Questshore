# Page Structure Audit

> Audited 2026-07-23 — every visible section, tab, and image per page.

---

## Home Page (`/`)

### Sections (top to bottom)

| # | Section name (as visitor sees it) | Images | In schema? |
|---|-----------------------------------|--------|------------|
| 1 | **Hero** — fullscreen banner with search form | `hero.image` (one hero background) | ✅ `hero` object with `title`, `subtitle`, `image` |
| 2 | **Explore Our Destinations** — 6 DestinationCards | Each from `destination.cardImage` via reference | ✅ `featuredDestinations` (array of destination references) |
| 3 | **Why QuestAshore?** — 4 static cards (Travel With Confidence, Back To Ship Guaranteed, Payment Plan, Giving Back) | None — hardcoded SVG icons + text | ❌ Not in schema (hardcoded in page component) |
| 4 | **Real Stories From Real Cruisers** — 2 testimonial quote cards with author avatar initials | None — author avatar initial letter only | ✅ `testimonials` array |
| 5 | **Frequently Asked Questions** — FaqAccordion | None — hardcoded Q&A | ❌ Not in schema (hardcoded in FaqAccordion component) |

### Image audit result

**Nothing missed.** Hero image and destination images are all correctly captured.

---

## About Page (`/about`)

### Sections (top to bottom)

| # | Section name (as visitor sees it) | Images | In schema? |
|---|-----------------------------------|--------|------------|
| 1 | **Hero Banner** — fullscreen image with gradient overlay | `heroBanner` (one) | ✅ |
| 2a | **Tab: "How It Started"** — photo collage (left) + text (right) | `collageImage1`, `collageImage2`, `collageImage3` | ✅ Assigned to fieldset `howItStarted` |
| 2b | **Tab: "Giving Back"** — photo collage (left) + text (right) | Was sharing same 3 images as "How It Started" | ✅ Now has dedicated `givingBackImage1`, `givingBackImage2`, `givingBackImage3` in fieldset `givingBack` |
| 3 | **Why Choose Us** — 4 static advantage cards | None — hardcoded SVG icons + text | ❌ Not in schema (hardcoded in AboutBody component) |

### Image audit result

**Previously missed:** The "Giving Back" tab had no dedicated images — it reused the same 3 collage photos as "How It Started." **Fixed:** Added 3 new image fields (`givingBackImage1/2/3`) with their own fieldset.

---

## South Pacific Page (`/destinations/south-pacific`)

### Sections (top to bottom)

| # | Section name (as visitor sees it) | Images | In schema? |
|---|-----------------------------------|--------|------------|
| 1 | **Hero** — fullscreen background with "Did your itinerary say South Pacific?" text | `heroBackgroundImage` (one) | ✅ |
| 2 | **Destination List** — 2-column grid of port cards (Port Vila, Noumea, Lifou, Fiji) | Each from `destination.cardImage` via reference | ✅ `destinations` array of references |

### Image audit result

**Nothing missed.**

---

## Caribbean Page (`/destinations/caribbean`)

### Sections (top to bottom)

| # | Section name (as visitor sees it) | Images | In schema? |
|---|-----------------------------------|--------|------------|
| 1 | **Hero** — fullscreen background with "Customised Destination Experiences" text | `heroBackgroundImage` (one) | ✅ |
| 2 | **Destination List** — 2-column grid of port cards (Roatan, Cozumel) | Each from `destination.cardImage` via reference | ✅ `destinations` array of references |

### Image audit result

**Nothing missed.**

---

## Group Excursions Page (`/group-excursions`)

### Sections (top to bottom)

| # | Section name (as visitor sees it) | Images | In schema? |
|---|-----------------------------------|--------|------------|
| 1 | **Hero** — fullscreen background with "Custom Group Shore Excursions" text | `heroBackgroundImage` (one) | ✅ |
| 2 | **Group Experiences Designed With You In Mind** — 3 numbered experience cards (Family, Corporate, Solo) | None — gradient backgrounds + lucide-react icons | ❌ Not in schema (hardcoded in GroupExcursionsBody) |
| 3 | **Design Your Private Group Experience** — 11-field inquiry form | None | ❌ Not in schema (hardcoded form in GroupExcursionsBody) |
| 4 | **Full Fleet Coordination** — info banner | None | ❌ Not in schema (hardcoded in GroupExcursionsBody) |

### Image audit result

**Nothing missed.** Only the hero image was expected.

---

## Travel Agent Page (`/travel-agent`)

### Sections (top to bottom)

| # | Section name (as visitor sees it) | Images | In schema? |
|---|-----------------------------------|--------|------------|
| 1 | **Hero** — fullscreen background with "TRAVEL AGENT NETWORK" text | `heroBackgroundImage` (one) | ✅ |
| 2 | **Intro Text** — 4 paragraphs of copy | None | ❌ Not in schema (hardcoded in TravelAgentBody) |
| 3 | **The Perks** — 5 benefit cards (Earn Commission, Lower Priced, Guarantee Return, 24/7 Support, Better Together) | None — numbered text cards | ❌ Not in schema (hardcoded in TravelAgentBody) |
| 4 | **Our Destinations** — DestinationCard grid (6 cards) | Each from `destination.cardImage` | ✅ `featuredDestinations` array of references |
| 5 | **Partner With Us** — 5-field inquiry form | None | ❌ Not in schema (hardcoded form in TravelAgentBody) |

### Image audit result

**Nothing missed.** Hero image and destination card references are correctly captured.

---

## Fieldset Structure Summary

### `southPacificPage.js`
```
> Hero Section (collapsible)
    heroBackgroundImage
> Destination List Section (collapsible)
    destinations (reference array)
```

### `caribbeanPage.js`
```
> Hero Section (collapsible)
    heroBackgroundImage
> Destination List Section (collapsible)
    destinations (reference array)
```

### `homePage.js`
```
> Hero Section (collapsible)
    hero (object: title, subtitle, image)
> Explore Our Destinations Section (collapsible)
    featuredDestinations (reference array)
> Real Stories From Real Cruisers Section (collapsible)
    testimonials (array of {quote, author})
```

### `aboutPage.js`
```
> Hero Section (collapsible)
    heroBanner
> Tab: How It Started (collapsible)
    collageImage1, collageImage2, collageImage3
> Tab: Giving Back (collapsible)
    givingBackImage1, givingBackImage2, givingBackImage3
```

### `groupExcursionsPage.js`
```
> Hero Section (collapsible)
    heroBackgroundImage
```

### `travelAgentPage.js`
```
> Hero Section (collapsible)
    heroBackgroundImage
> Our Destinations Section (collapsible)
    featuredDestinations (reference array)
```
