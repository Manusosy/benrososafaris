'use server';

import type { SupabaseClient } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/server';

/**
 * CMS content dependency model.
 *
 * Some content types can only be authored once their prerequisites exist — e.g.
 * a Tour links to Destinations and National Parks, and a Package is a comfort
 * tier variant of an existing Tour. This module declares those dependencies in
 * one place and provides a server-side check the wizard entry points use to gate
 * creation (and to point editors at what to create first).
 *
 * The order mirrors the agreed authoring flow:
 *   destinations -> national parks -> experiences -> accommodations / fleet
 *   -> tours -> packages
 */

export type CmsEntityKey =
  | 'destinations'
  | 'national_parks'
  | 'experiences'
  | 'accommodations'
  | 'fleet'
  | 'tours'
  | 'packages';

interface PrerequisiteRule {
  /** Entity that must already have rows. */
  entity: CmsEntityKey;
  /** Minimum number of rows required (any status). */
  min: number;
  /** Human explanation shown to the editor. */
  reason: string;
}

interface EntityMeta {
  label: string;
  /** Base table used for existence counts. */
  table: string;
  /** Portal list route, used to deep-link an editor to the missing prerequisite. */
  href: string;
  requires: PrerequisiteRule[];
}

const ENTITY_META: Record<CmsEntityKey, EntityMeta> = {
  destinations: {
    label: 'Destinations',
    table: 'destinations',
    href: '/portal/destinations',
    requires: []
  },
  national_parks: {
    label: 'National Parks',
    table: 'national_parks',
    href: '/portal/national-parks',
    requires: []
  },
  experiences: {
    label: 'Experiences',
    table: 'experiences',
    href: '/portal/experiences',
    requires: []
  },
  accommodations: {
    label: 'Accommodations',
    table: 'accommodations',
    href: '/portal/accommodations',
    requires: []
  },
  fleet: {
    label: 'Fleet',
    table: 'fleet_vehicles',
    href: '/portal/fleet',
    requires: []
  },
  tours: {
    label: 'Safari Tours',
    table: 'tours',
    href: '/portal/tours',
    requires: [
      {
        entity: 'destinations',
        min: 1,
        reason: 'A tour must reference at least one destination it travels through.'
      }
    ]
  },
  packages: {
    label: 'Safari Packages',
    table: 'packages',
    href: '/portal/packages',
    requires: [
      {
        entity: 'tours',
        min: 1,
        reason:
          'A package is a comfort-tier variant of an existing tour, so a tour must exist first.'
      }
    ]
  }
};

export interface MissingPrerequisite {
  label: string;
  href: string;
  have: number;
  need: number;
  reason: string;
}

export interface PrerequisiteStatus {
  ok: boolean;
  missing: MissingPrerequisite[];
}

async function countRows(table: string): Promise<number> {
  // Generic, runtime-driven table name: use the untyped client surface since the
  // typed client only accepts literal table names.
  const supabase = (await createClient()) as unknown as SupabaseClient;
  const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
  if (error) return 0;
  return count ?? 0;
}

/**
 * Returns whether `entity` can be created right now and, if not, the list of
 * prerequisites still missing (with counts and a link to resolve each).
 */
export async function getPrerequisiteStatus(entity: CmsEntityKey): Promise<PrerequisiteStatus> {
  const meta = ENTITY_META[entity];
  if (!meta.requires.length) {
    return { ok: true, missing: [] };
  }

  const counts = await Promise.all(
    meta.requires.map((rule) => countRows(ENTITY_META[rule.entity].table))
  );

  const missing = meta.requires.flatMap((rule, index) => {
    const have = counts[index];
    if (have >= rule.min) return [];
    const dep = ENTITY_META[rule.entity];
    return [{ label: dep.label, href: dep.href, have, need: rule.min, reason: rule.reason }];
  });

  return { ok: missing.length === 0, missing };
}

export async function getEntityLabel(entity: CmsEntityKey): Promise<string> {
  return ENTITY_META[entity].label;
}
