# Prompt: Build Sanity Image Fields (Corrected Plan)

Thanks for the review — here are the decisions:

- Keep everything in **JavaScript**, in the existing `sanity/schemas/` folder. Do not create a new `sanity/schemaTypes/` TypeScript folder.
- On the existing excursion object schema: **only add a `photo` field.** Keep `name`, `pricing`, `description`, `requiresTime`, `highlights` exactly as they are — don't rename or remove anything.
- Keep `navigation.js` registered and untouched.
- Keep the existing `cardImage` / `heroImage` field names on `destination.js` as they already are — no renaming to `cardPhoto`.
- Reference the existing `home.merge.ts` and `destinations.merge.ts` as the pattern to follow for all new merge functions — there is no separate blueprint file, use what's already in the codebase.

Please execute in this order, confirming the build still succeeds after each step before moving to the next:

1. Add a `region` field (South Pacific / Caribbean) and a `photo` field per excursion to `sanity/schemas/destination.js`. Keep every existing field.
2. Create `aboutPage.js`, `southPacificPage.js`, `caribbeanPage.js`, `groupExcursionsPage.js`, `travelAgentPage.js` schemas — image fields only, matching what's listed in `docs/full-image-audit.md` for each page (e.g. `heroBanner`, `collageImage1/2/3` for About Us).
3. Create `lib/content/about.fallback.ts`, `southPacific.fallback.ts`, `caribbean.fallback.ts`, `groupExcursions.fallback.ts`, `travelAgent.fallback.ts` — seed each with the **exact current live image URLs** copied from the existing inline data in each page file (don't substitute new photos).
4. Create merge functions for each new page, following the same pattern as the existing `home.merge.ts` / `destinations.merge.ts` — including the `.length > 0` check for any array before falling back.
5. Add GROQ queries for each new page to `lib/sanity/queries.ts`.
6. Wire each page component to its merge function, replacing only the image sources. Leave all other text, layout, pricing, and descriptions untouched.
7. Update `sanity/schemas/index.js` to register the new page schemas.
8. Create `sanity/structure.js` for the Studio menu: a "Pages" group (Home, About Us, South Pacific, Caribbean, Group Excursions, Travel Agent) each pinned to a fixed singleton document ID, plus a "Destinations" list (Port Vila, Noumea, Lifou, Fiji, Roatan, Cozumel).
9. Do not touch `contact/page.js`, and do not wire up the unused `ExcursionCard.js` or `DestinationHero.js` components.

After each step, confirm the site still renders identically to production with an empty/unpublished Sanity dataset before continuing to the next step.
