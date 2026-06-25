import { cn } from '@/lib/utils';

/**
 * Light-theme token scope for portaled CMS surfaces.
 *
 * Radix portals (dialog / select / popover content) mount on `document.body`,
 * which sits outside the portal layout's `data-theme="benroso"` wrapper, so
 * they otherwise inherit the dark root theme. Applying this class re-scopes the
 * design tokens to the portal's white palette (and brand-green primary) so
 * dropdowns, dialogs, and comboboxes stay consistent — never the black look.
 */
export const CMS_SURFACE = cn(
  'bg-white text-neutral-900 border-[#E5E7EB]',
  '[--background:#ffffff] [--foreground:#111827] [--card:#ffffff] [--popover:#ffffff] [--popover-foreground:#111827]',
  '[--muted:#f3f4f6] [--muted-foreground:#6b7280] [--accent:#f3f4f6] [--accent-foreground:#111827]',
  '[--border:#e5e7eb] [--input:#e5e7eb] [--primary:#3c5142] [--primary-foreground:#ffffff] [--ring:#3c5142]'
);
