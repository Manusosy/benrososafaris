'use client';

import * as React from 'react';

import { Icons } from '@/components/icons';
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  isSameDay,
  parseIsoDate,
  startOfDay,
  startOfMonth,
  startOfWeek,
  toIsoDate
} from '@/lib/travel-date-utils';
import { cn } from '@/lib/utils';

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

export type TravelDateCalendarProps = {
  className?: string;
  defaultMonth: Date;
  maxDate?: Date;
  minDate: Date;
  onSelect: (date: Date) => void;
  selected?: Date;
};

function isBeforeMin(date: Date, minDate: Date) {
  return startOfDay(date).getTime() < startOfDay(minDate).getTime();
}

function isAfterMax(date: Date, maxDate?: Date) {
  if (!maxDate) return false;
  return startOfDay(date).getTime() > startOfDay(maxDate).getTime();
}

function buildMonthGrid(viewMonth: Date) {
  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(viewMonth);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);
  const days: Date[] = [];

  for (let cursor = gridStart; cursor.getTime() <= gridEnd.getTime(); cursor = addDays(cursor, 1)) {
    days.push(cursor);
  }

  return days;
}

export function TravelDateCalendar({
  className,
  defaultMonth,
  maxDate,
  minDate,
  onSelect,
  selected
}: TravelDateCalendarProps) {
  const [viewMonth, setViewMonth] = React.useState(() => startOfMonth(defaultMonth));
  const today = React.useMemo(() => startOfDay(new Date()), []);

  React.useEffect(() => {
    setViewMonth(startOfMonth(defaultMonth));
  }, [defaultMonth]);

  const days = React.useMemo(() => buildMonthGrid(viewMonth), [viewMonth]);
  const minMonth = startOfMonth(minDate);
  const maxMonth = maxDate ? startOfMonth(maxDate) : null;
  const canGoPrevious = viewMonth.getTime() > minMonth.getTime();
  const canGoNext = !maxMonth || viewMonth.getTime() < maxMonth.getTime();

  function goToPreviousMonth() {
    if (!canGoPrevious) return;
    setViewMonth((month) => addMonths(month, -1));
  }

  function goToNextMonth() {
    if (!canGoNext) return;
    setViewMonth((month) => addMonths(month, 1));
  }

  return (
    <div className={cn('benroso-travel-date-calendar-ui', className)}>
      <div className='benroso-travel-date-calendar-header'>
        <button
          aria-label='Previous month'
          className='benroso-travel-date-calendar-nav'
          disabled={!canGoPrevious}
          onClick={goToPreviousMonth}
          type='button'
        >
          <Icons.chevronLeft className='h-4 w-4' />
        </button>

        <p className='benroso-travel-date-calendar-title'>
          {viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>

        <button
          aria-label='Next month'
          className='benroso-travel-date-calendar-nav'
          disabled={!canGoNext}
          onClick={goToNextMonth}
          type='button'
        >
          <Icons.chevronRight className='h-4 w-4' />
        </button>
      </div>

      <div className='benroso-travel-date-calendar-weekdays' role='row'>
        {WEEKDAY_LABELS.map((label) => (
          <span className='benroso-travel-date-calendar-weekday' key={label} role='columnheader'>
            {label}
          </span>
        ))}
      </div>

      <div className='benroso-travel-date-calendar-grid' role='grid'>
        {days.map((date) => {
          const inCurrentMonth = date.getMonth() === viewMonth.getMonth();
          const iso = toIsoDate(date);

          if (!inCurrentMonth) {
            return (
              <span
                aria-hidden='true'
                className='benroso-travel-date-calendar-cell benroso-travel-date-calendar-cell--empty'
                key={iso}
              />
            );
          }

          const disabled = isBeforeMin(date, minDate) || isAfterMax(date, maxDate);
          const isSelected = selected ? isSameDay(date, selected) : false;
          const isToday = isSameDay(date, today);

          return (
            <button
              aria-label={date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                weekday: 'long',
                year: 'numeric'
              })}
              aria-selected={isSelected}
              className={cn(
                'benroso-travel-date-calendar-cell',
                disabled && 'benroso-travel-date-calendar-cell--disabled',
                isSelected && 'benroso-travel-date-calendar-cell--selected',
                isToday && !isSelected && 'benroso-travel-date-calendar-cell--today'
              )}
              disabled={disabled}
              key={iso}
              onClick={() => onSelect(date)}
              role='gridcell'
              type='button'
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
