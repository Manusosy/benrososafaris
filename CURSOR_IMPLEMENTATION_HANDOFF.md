# Cursor Implementation Handoff: Trips, Packages, Experiences

## First Instruction To Cursor

Before changing code, do a comprehensive assessment of the current implementation. Do not start from assumptions.

Review the public pages visually and structurally:

- `/en/tours`
- `/en/tours/[slug]`
- `/en/safari-packages`
- `/en/safari-packages/[slug]`
- `/en/experiences`
- `/en/experiences/[slug]`
- `/en/destinations/[slug]`
- `/en/accommodations`

Review the portal pages and wizards:

- `/portal/tours`
- `/portal/tours/new`
- `/portal/tours/[id]`
- `/portal/packages`
- `/portal/packages/new`
- `/portal/packages/[id]`
- `/portal/experiences`
- `/portal/destinations`
- `/portal/accommodations`

Compare what exists against the product model below, then implement in small, verified steps. Keep the Benroso design system consistent: deep green, lime accent, ivory/white surfaces, low-radius cards/buttons, Playfair headings on public pages, dense but calm portal UI, and clear conversion CTAs.

## Product Model

The current wording around packages needs refinement. Avoid using "route" as the main editor/client concept.

Use this model:

- **Trip**: the itinerary. It owns days, destinations, parks, route flow, accommodation options, inclusions/exclusions, and the main pricing matrix.
- **Package / Experience**: the way a client takes that trip. Examples: Fly-in Safari, Group Joining, Honeymoon, Private Safari, Beach Extension, Mountain Hiking, Family Safari, Luxury Safari.
- **Comfort tier**: the accommodation/service level inside a trip or package. Examples: Budget, Mid-range, Luxury, Premium.

Do not create duplicate itineraries for packages. A package should wrap or specialize a trip, not replace it.

## Recommended Public Information Architecture

### Trips

`/en/tours` is the canonical itinerary catalog.

Trip detail pages should show:

- Gallery
- Overview
- Day-by-day itinerary
- Route facts
- Destinations and parks visited
- Route-relevant accommodations
- Prices and seasons matrix
- Included / excluded
- "Ways to Travel This Trip" package cards
- Similar trips
- Enquiry CTAs

The phrase "route" may appear as supporting detail, but the main client-facing concept should be "trip itinerary".

### Experiences / Packages

The Experiences page should become the commercial package-style browsing area. It should not feel like a generic article/listing page.

Use `/en/experiences` as the client-friendly package category index:

- Fly-in Safaris
- Group Joining Safaris
- Honeymoon Safaris
- Private Safaris
- Beach Extensions
- Mountain Hiking
- Family Safaris
- Luxury Safaris

Each experience detail page should explain that travel style and show related trip/package cards.

Example:

- `/en/experiences/fly-in-safaris`
- Explains fly-in safari benefits and who it suits
- Shows trips/packages where package type is `fly_in`
- Cards link to either the package detail or the underlying trip with the package context

### Safari Packages

Decide whether `/en/safari-packages` remains a curated commercial landing/catalog page or redirects/aligns with `/en/experiences`.

Recommended approach:

- Keep `/en/safari-packages` as a curated all-packages catalog for SEO and conversion.
- Use `/en/experiences` as the package category index.
- Both should draw from the same package/experience relationships so content is not duplicated.

## Portal Wizard Changes

The current package wizard says "Route & Tier". Change this language.

Recommended wizard step labels:

1. **Trip & Package Type**
2. **Package Copy**
3. **Pricing & Overrides**
4. **SEO**
5. **Review**

### Step 1: Trip & Package Type

Fields:

- Package title
- URL slug
- Base trip itinerary
- Package type / experience
- Comfort tier
- Optional campaign/group label

Replace "Source trip route" with **Base trip itinerary**.

After selecting a trip, show a compact trip summary:

- Duration
- Start point / end point
- Destinations
- Parks visited
- Route flow, as supporting detail only
- Available accommodations
- Existing pricing tiers

This helps editors know they selected the correct trip without making "route" the primary concept.

### Step 2: Package Copy

Fields:

- Excerpt
- Main package content
- Highlights
- Best for
- Travel style notes
- Optional package-specific itinerary notes

Important: do not duplicate the full day-by-day trip itinerary unless there is a genuine package-specific difference.

### Step 3: Pricing & Overrides

Pricing should usually inherit from the base trip pricing matrix.

Fields:

- Uses trip pricing by default
- Optional package price adjustment type:
  - none
  - fixed supplement
  - percentage supplement
  - custom price cells
- Optional package-specific inclusions/exclusions
- Optional seasonal availability notes

If the package has a comfort tier selected, the public detail should default to that tier in the pricing table.

### Step 4: SEO

Fields:

- SEO title
- SEO description
- OG image
- Canonical package/experience relationship where needed

### Step 5: Review

Show:

- Package title and slug
- Base trip selected
- Package type / experience
- Comfort tier
- Pricing inheritance/override summary
- Public URL preview
- Missing-content warnings

## Data Connections Needed

Inspect existing Supabase schema before editing. Use current tables where possible.

Expected relationships:

- `tours`: base trip records
- `tour_translations`: trip public copy
- `tour_itinerary_days`: day-by-day itinerary
- `tour_destinations` or equivalent: destinations/parks connected to trips
- `tour_accommodations`: route-relevant accommodations
- `tour_pricing_tiers`: comfort tiers/pricing labels
- `tour_pricing_seasons`: season bands
- `tour_pricing_cells`: matrix cells
- `experiences`: package/travel-style categories
- `experience_translations`: category copy
- `packages`: package variants tied to tours and experiences
- `package_translations`: package-specific copy

Recommended package fields if missing:

- `tour_id`
- `experience_id` or `package_type`
- `comfort_tier`
- `campaign_label`
- `pricing_mode`
- `price_adjustment_type`
- `price_adjustment_value`
- `status`
- `published_at`
- `deleted_at`

Use migrations carefully and update `src/types/database.types.ts` after schema changes.

## Public Page Wiring

### Trip Detail

On a trip detail page, show packages related by:

- same `tour_id`
- published status
- matching locale translation

Section name: **Ways to Travel This Trip**.

Cards should clearly show:

- Package type / experience
- Comfort tier
- Price-from if available
- What changes from the base trip
- CTA: View package or Enquire

### Experience Detail

On an experience detail page, show packages related by:

- `packages.experience_id = current experience`
- or `packages.package_type = current type`
- and published status

Cards should show the base trip itinerary context:

- Trip title
- Duration
- Destinations/parks
- Comfort tier
- Price-from

### Packages Catalog

Allow filters for:

- Package type / experience
- Destination
- Park
- Duration
- Comfort tier
- Price range
- Travel style

Make URLs reflect filters.

## Portal Index Pages

The shared portal module page now has search, stat cards, published/draft/trash filters, and table empty states. Preserve and extend that pattern.

If a module gets a more specialized table, keep these UX rules:

- Drafts must be easy to find.
- Trash must be visible and recoverable where data supports it.
- Empty states belong inside the table body area.
- Search and status filters should not overlap on mobile.
- Row titles should link to edit pages.
- Status labels should use client/editor language, not database jargon.

## Design Quality Bar

Use FlashMC as a conversion/layout reference, not as branding to copy.

Important public patterns:

- Image-led cards
- Strong page hero
- Sticky anchor tabs on long destination/detail pages
- Sidebar filters on catalogs
- Trust/booking sidebars on detail pages
- Clear enquiry CTAs
- Pricing matrix that is readable on mobile

Do not add marketing fluff. Build actual browsing and booking flows.

## Verification Checklist

Run:

```bash
bunx tsc --noEmit --pretty false
bun run build
bun run lint
```

Known current lint debt may exist in unrelated files. If lint fails, separate pre-existing failures from new failures.

Browser-verify:

- `/en/tours`
- `/en/tours/[slug]`
- `/en/experiences`
- `/en/experiences/[slug]`
- `/en/safari-packages`
- `/en/safari-packages/[slug]`
- `/portal/tours`
- `/portal/tours/new`
- `/portal/packages`
- `/portal/packages/new`

Check desktop and mobile widths. Confirm text does not overlap, filters remain usable, and empty states are meaningful.

## Senior Developer Guidance

Prefer small schema-aware changes over broad rewrites. First understand what was already built, then align terminology and relationships.

The goal is production readiness:

- Editors should understand what they are creating.
- Clients should understand the difference between a trip and a package.
- Experiences should become useful commercial package categories.
- Pricing should remain maintainable from the admin side.
- The public site should convert visitors without duplicating content.
