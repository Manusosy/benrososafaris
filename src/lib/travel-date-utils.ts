export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function startOfWeek(date: Date) {
  const day = startOfDay(date);
  return addDays(day, -day.getDay());
}

export function endOfWeek(date: Date) {
  return addDays(startOfWeek(date), 6);
}

export function isSameDay(a: Date, b: Date) {
  return toIsoDate(a) === toIsoDate(b);
}

export function addMonths(date: Date, months: number) {
  return startOfMonth(new Date(date.getFullYear(), date.getMonth() + months, 1));
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return startOfDay(next);
}

export function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseIsoDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return startOfDay(new Date(year, month - 1, day));
}

export function getDateContextLabel(date: Date) {
  const today = startOfDay(new Date());
  const target = startOfDay(date);
  const diffMs = target.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  return null;
}

export function formatTravelDateLong(iso: string) {
  return parseIsoDate(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
    year: 'numeric'
  });
}

export function formatTravelDateRange(startIso: string, endIso: string) {
  return `${formatTravelDateLong(startIso)} – ${formatTravelDateLong(endIso)}`;
}

export type TravelDuration = {
  days: number;
  nights: number;
};

/** Inclusive trip length: same calendar day = 1 day / 0 nights. */
export function calculateTravelDuration(startIso: string, endIso?: string | null): TravelDuration {
  const start = parseIsoDate(startIso);
  const end = endIso ? parseIsoDate(endIso) : start;
  const diffDays = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  const days = Math.max(1, diffDays);
  const nights = Math.max(0, days - 1);

  return { days, nights };
}

export function formatTravelDuration(duration: TravelDuration) {
  const dayLabel = duration.days === 1 ? 'Day' : 'Days';
  const nightLabel = duration.nights === 1 ? 'Night' : 'Nights';
  return `${duration.days} ${dayLabel} / ${duration.nights} ${nightLabel}`;
}

function parseFormattedTravelDate(value: string) {
  const parsed = new Date(value.trim());
  if (Number.isNaN(parsed.getTime())) return null;
  return startOfDay(parsed);
}

/** Parse "Tue, 30 Jun 2026 – Fri, 3 Jul 2026" or ISO ranges from preferredDates text. */
export function parsePreferredDatesRange(preferredDates: string) {
  const parts = preferredDates
    .split(/\s*[–—-]\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length === 1) {
    const start = parseFormattedTravelDate(parts[0]);
    return start ? { endIso: toIsoDate(start), startIso: toIsoDate(start) } : null;
  }
  if (parts.length !== 2) return null;

  const start = parseFormattedTravelDate(parts[0]);
  const end = parseFormattedTravelDate(parts[1]);
  if (!start || !end) return null;

  return {
    endIso: toIsoDate(end),
    startIso: toIsoDate(start)
  };
}

export function resolveTravelDateRange(input: {
  preferredDates?: string | null;
  travelEndDate?: string | null;
  travelStartDate?: string | null;
}) {
  if (input.travelStartDate) {
    return {
      endIso: input.travelEndDate ?? input.travelStartDate,
      startIso: input.travelStartDate
    };
  }

  if (input.preferredDates) {
    return parsePreferredDatesRange(input.preferredDates);
  }

  return null;
}

export function formatPreferredDatesWithDuration(input: {
  preferredDates?: string | null;
  travelEndDate?: string | null;
  travelStartDate?: string | null;
}) {
  const hasExplicitEnd = Boolean(input.travelEndDate?.trim());
  const range = resolveTravelDateRange(input);
  if (!range) return input.preferredDates ?? null;

  const hasEndDate = hasExplicitEnd || range.endIso !== range.startIso;
  const dateLabel =
    hasEndDate && range.endIso
      ? formatTravelDateRange(range.startIso, range.endIso)
      : input.preferredDates?.trim() || formatTravelDateLong(range.startIso);

  if (!hasEndDate) {
    return dateLabel;
  }

  const duration = calculateTravelDuration(range.startIso, range.endIso);
  return `${dateLabel} | ${formatTravelDuration(duration)}`;
}
