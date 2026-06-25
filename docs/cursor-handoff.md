# Cursor Handoff: Benroso Safaris

## Current State

This repository is initialized from `Kiranism/next-shadcn-dashboard-starter` and has been renamed for Benroso Safaris. It is not production-ready yet. It now contains the foundation Cursor should continue from:

- Supabase folder and initial CMS migration
- Supabase SSR/server/browser client helpers
- Locale detection middleware
- Locale-first public route tree under `src/app/[locale]`
- Blog and destination dynamic route boilerplate with Supabase translation-table lookups
- Automated SEO/GEO/AEO helper modules
- Benroso contact defaults and brand color constants
- Benroso-specific README

## Starter Cleanup Completed

The starter cleanup removed the core Clerk package, Clerk auth folders, organizations/workspaces, billing routes, profile routes, and non-localized starter public pages. Continue removing or repurposing remaining demo features before building production CMS screens:

- Pokémon/react-query demo content
- Generic product demo pages unless they are repurposed into CMS tables
- Generic chat demo unless it becomes an internal sales/enquiry tool

Keep useful infrastructure:

- Dashboard layout
- Sidebar shell
- shadcn/ui components
- data table components
- form field components
- theme provider
- command/search patterns
- chart components only for real CMS analytics

## Auth Direction

Supabase Auth is the only auth system.

Use:

- `src/lib/supabase/server.ts` for Server Components and server actions
- `src/lib/supabase/browser.ts` for client components
- `src/lib/supabase/service-role.ts` only in trusted server-only routes/actions

Do not expose `SUPABASE_SERVICE_ROLE_KEY` to client components.

## Route Rules

All public routes must stay under `/{locale}`. Do not create non-localized public duplicates.

The important dynamic routes are:

- `/{locale}/tours/{slug}`
- `/{locale}/destinations/{slug}`
- `/{locale}/blog/{slug}`

Each dynamic route must query the matching translation table by `locale` and `slug`.

## Translation Model

Use translation-specific tables. Do not store all languages in one giant JSON field for primary route content.

Core examples:

- `blog_posts` + `blog_translations`
- `destinations` + `destination_translations`
- `tours` + `tour_translations`
- `packages` + `package_translations`
- `experiences` + `experience_translations`
- `accommodations` + `accommodation_translations`
- `fleet_vehicles` + `fleet_vehicle_translations`

Translation tables must keep:

- `locale`
- `slug`
- title/name fields
- body/rich content
- `seo_title`
- `seo_description`
- `og_image_id`
- `canonical_override`
- `faqs`
- `direct_answers`
- `published_at`

## SEO/GEO/AEO Automation

Do not hand-code metadata per page. Continue building reusable helpers under `src/lib/seo`.

Every detail page should generate:

- canonical URL using the active locale path
- hreflang alternates from translation tables
- Open Graph metadata
- breadcrumb JSON-LD
- schema.org JSON-LD matching visible content
- FAQPage JSON-LD only when FAQs are visibly rendered

Schema targets:

- Blog posts: `BlogPosting`
- Destinations: `TouristDestination`
- Tours: `TouristTrip`
- Packages with visible price/offer: `TouristTrip` plus `Product`
- Agency-wide layout: `TravelAgency`

## Design Guardrails

- Card radius max: `8px`
- No generic colored card highlights
- No unnecessary shadows
- No nested cards
- Do not create one-off components for repeated surfaces
- Buttons must use consistent sizing and icon placement
- Public headings use Playfair Display
- Body/nav/forms/dashboard UI use Inter

Build shared components first:

- `Button`
- `SectionHeader`
- `MediaFrame`
- `ContentCard`
- `TourCard`
- `DestinationCard`
- `AccommodationCard`
- `FleetVehicleCard`
- `FilterRail`
- `RichTextEditor`
- `SeoPanel`
- `FaqEditor`
- `DirectAnswersEditor`
- `RelationshipPicker`
- `MediaPicker`
- `SlugField`
- `StatusBadge`

## Reference Folder

`D:\Benukisafaris\benukisafaris\nature-romp-safaris` is a temporary reference only. Use it to understand feature scope and content architecture, then remove it from the workspace once no longer useful.
