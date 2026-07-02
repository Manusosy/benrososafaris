# Benroso Safaris

Premium multilingual safari website and custom CMS for Benroso Safaris Ltd.

This project was initialized from `Kiranism/next-shadcn-dashboard-starter` so the team can reuse a strong shadcn dashboard shell, tables, forms, theme infrastructure, and admin layout. The business application is Benroso-specific: a high-end tourism website and custom CMS backed by Supabase.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Supabase Auth, Postgres, Storage, and Row Level Security
- `@supabase/ssr` for App Router server/browser clients
- `next-intl` for locale-aware routing
- Framer Motion for public-site motion
- TipTap for reusable rich text editors
- Playfair Display for public-site headings
- Inter for body, navigation, forms, dashboard UI, and controls

## Project Rules

- Do not use Payload CMS.
- Do not use Neon.
- Do not keep Clerk auth from the dashboard starter. Clerk references are legacy scaffold debt; the starter cleanup has removed the core Clerk package/folders, and any remaining demo copy must be replaced with Supabase Auth workflows.
- Supabase Auth is the only authentication system.
- Content must be dynamic through Supabase CMS tables.
- Do not hardcode tours, packages, destinations, accommodations, fleet vehicles, navigation, FAQs, testimonials, or SEO content.
- Card border radius must not exceed `8px`.
- Avoid unnecessary shadows, generic color highlights, decorative blobs, and nested cards.
- Reuse shared components before creating new ones.
- Keep button sizes, padding, radius, icon placement, and typography consistent across public pages and admin surfaces.
- Use rich text editor components anywhere long descriptions are needed: tours, destinations, accommodations, fleet vehicles, blog posts, page sections, FAQs, and direct answers.

## Brand Defaults

Initial Benroso contact defaults are stored in `src/config/benroso.ts` and should be seeded into `site_settings` while remaining editable in the dashboard.

Confirmed public contact references:

- Current site: https://benrososafaris.co.ke/
- Contact page: https://benrososafaris.co.ke/contact-benroso-safaris/
- KATO profile: https://katokenya.org/membership-account/profile/benroso-safaris-ltd/

Default brand palette:

- Primary: `#3C5142`
- Primary dark: `#2F4034`
- Warm gold accent: `#D99A2B`
- Espresso brown: `#5D2411`
- Ivory: `#F8F5EF`
- White: `#FFFFFF`

## Local Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Create `.env.local` from `env.example.txt`. A local `.env.local.example` has also been placed in the workspace for the original setup checklist, but the starter's `.gitignore` ignores all `.env*` files.

3. Start Supabase locally:

   ```bash
   npx supabase start
   ```

4. Run migrations:

   ```bash
   npx supabase db reset
   ```

5. Start the dev server:

   ```bash
   bun run dev
   ```

   The app runs at [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
bun run build   # production build
bun run start   # run production server
bun run lint    # lint with oxlint
```

## Current Setup Notes

- This app uses `src/app` rather than a root-level `app` directory because the dashboard starter was scaffolded that way.
- The requested locale-first public routes have been created under `src/app/[locale]`.
- `src/middleware.ts` contains locale detection. `src/proxy.ts` re-exports it for Next.js 16/starter compatibility.
- The starter still contains dashboard demo surfaces. See `docs/cursor-handoff.md` before continuing feature work.
- `nature-romp-safaris` lives outside this app as a temporary reference folder only. Do not copy it wholesale. Remove it from the workspace after useful patterns/content architecture have been extracted.

## Localization

All public routes live under `/{locale}`.

The middleware chooses locale by:

1. `NEXT_LOCALE` cookie
2. CDN country headers: `x-vercel-ip-country`, then `cf-ipcountry`
3. `Accept-Language`
4. English fallback

Users can override language using a language selector that writes `NEXT_LOCALE`.

Do not call a paid IP lookup API on every request. Prefer CDN country headers and browser language headers.

Supported initial locales:

- `en`
- `sw`
- `fr`
- `de`
- `es`
- `it`
- `zh`

## Routing

Required public route structure:

```txt
src/app/
  [locale]/
    layout.tsx
    page.tsx
    tours/
      page.tsx
      [slug]/
        page.tsx
    destinations/
      page.tsx
      [slug]/
        page.tsx
    blog/
      page.tsx
      [slug]/
        page.tsx
    safari-packages/
      page.tsx
      [slug]/
        page.tsx
    experiences/
      page.tsx
      [slug]/
        page.tsx
    accommodations/
      page.tsx
      [slug]/
        page.tsx
    our-fleet/
      page.tsx
      [slug]/
        page.tsx
    national-parks/
      page.tsx
      [slug]/
        page.tsx
    contact/
      page.tsx
  admin/
    login/
      page.tsx
    layout.tsx
    page.tsx
    content/
  api/
    enquiries/
      route.ts
```

## SEO, GEO, And AEO

Metadata, canonicals, hreflang, sitemap, JSON-LD, breadcrumbs, FAQ schema, and direct-answer blocks must be generated automatically from Supabase content and translation tables.

Automation rules:

- Canonical URLs always use the active locale path.
- Hreflang alternates are generated from translation tables.
- SEO title falls back to content-type templates.
- Meta description falls back to excerpt or summary.
- Open Graph image falls back to hero image, then site default.
- Breadcrumb JSON-LD is generated from route segments.
- FAQPage JSON-LD is generated only from visible FAQs.
- Sitemap includes only published localized routes.
- Filter/search query pages are `noindex, follow`.
- Redirects come from Supabase `redirects`, then static `next.config.ts` fallbacks.
- The dashboard SEO panel should show previews and warnings, but editors should not manually hand-build schema.

GEO/AEO requirements:

- Store destination entities, coordinates, country, region, park, wildlife, best-time data, and linked tours.
- Store concise `direct_answers` for answer-engine surfaces.
- Generate visible Q&A sections from `direct_answers` and FAQs.
- Add internal links automatically: destination to tours/accommodations/blog, tour to destinations/accommodations, blog to related tours.
- Add `/llms.txt` later from the published sitemap and important business facts.

## Supabase Documentation

- Supabase SSR clients: https://supabase.com/docs/guides/auth/server-side/creating-a-client
- Supabase local development: https://supabase.com/docs/guides/local-development
- Supabase CLI reference: https://supabase.com/docs/reference/cli/introduction

## Dashboard Starter Reference

- Source starter: https://github.com/Kiranism/next-shadcn-dashboard-starter
- Keep useful dashboard layout, sidebar, tables, forms, themes, charts, and command palette only where they serve Benroso CMS/admin workflows.
- Remove generic SaaS, billing, workspace, product, chat, Pokémon, and demo pages unless explicitly repurposed for the CMS.
