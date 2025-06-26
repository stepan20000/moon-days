import lune from 'lune';
import * as SunCalc from 'suncalc';

import { MILLISECONDS_IN_DAY, MoonDay, MoonDaysWindow } from '../../entities';

const DAYS_SHIFT = 30 * MILLISECONDS_IN_DAY;

const EMPTY_MOON_DAYS_WINDOW: MoonDaysWindow = {
  previous: null,
  current: null,
  next: null,
};

export const getLastNewMoon: (date: Date) => Date = (date) =>
  lune
    .phase_range(new Date(date.getTime() - DAYS_SHIFT), date, lune.PHASE_NEW)
    ?.pop() || null;

export const getNextNewMoon: (date: Date) => Date = (date) =>
  lune
    .phase_range(date, new Date(date.getTime() + DAYS_SHIFT), lune.PHASE_NEW)
    ?.shift() || null;

export const getPreviousMoonRise: (
  when: Date,
  latitude: number,
  longitude: number,
  searchHorizon?: number
) => Date | null = (when, latitude, longitude, searchHorizon = 30) => {
  let pointer = new Date(when.getTime() - MILLISECONDS_IN_DAY);

  for (let i = 0; i < searchHorizon; i++) {
    const times = SunCalc.getMoonTimes(pointer, latitude, longitude);
    if (times.rise && times.rise < when) return times.rise;
    pointer = new Date(pointer.getTime() - MILLISECONDS_IN_DAY);
  }
  return null;
};

export const collectMoonRises: (
  from: Date,
  to: Date,
  lat: number,
  lon: number
) => Date[] = (from: Date, to: Date, latitude: number, longitude: number) => {
  const rises: Date[] = [];
  let pointer = new Date(from);

  while (pointer <= to) {
    const { rise } = SunCalc.getMoonTimes(pointer, latitude, longitude);
    if (rise && rise > from && rise <= to) rises.push(rise);
    pointer.setTime(pointer.getTime() + MILLISECONDS_IN_DAY);
  }
  return rises.sort((a, b) => a.getTime() - b.getTime());
};

export const getMoonDaysWindow: (
  latitude: number,
  longitude: number,
  now?: Date
) => MoonDaysWindow = (latitude, longitude, now = new Date()) => {
  const lastNewMoon = getLastNewMoon(now);
  const nextNewMoon = getNextNewMoon(now);

  if (!lastNewMoon || !nextNewMoon) return EMPTY_MOON_DAYS_WINDOW;

  const rises = collectMoonRises(lastNewMoon, nextNewMoon, latitude, longitude);

  if (rises.length === 0) return EMPTY_MOON_DAYS_WINDOW;

  const moonDays: MoonDay[] = [];
  moonDays.push({ day: 1, start: lastNewMoon, end: rises[0] });

  for (let i = 0; i < rises.length - 1; i++) {
    moonDays.push({
      day: i + 2,
      start: rises[i],
      end: rises[i + 1],
    });
  }

  moonDays.push({
    day: rises.length + 1,
    start: rises[rises.length - 1],
    end: nextNewMoon,
  });

  const index = moonDays.findIndex((d) => now >= d.start && now < d.end);
  const currentMoonDayIndex = index >= 0 ? index : 0;

  let previous: MoonDay | null = null;
  let next: MoonDay | null = null;

  if (currentMoonDayIndex > 0) {
    previous = moonDays[currentMoonDayIndex - 1];
  } else {
    const riseBeforeNewMoon = getPreviousMoonRise(
      lastNewMoon,
      latitude,
      longitude
    );
    if (riseBeforeNewMoon) {
      previous = {
        day: 29,
        start: riseBeforeNewMoon,
        end: lastNewMoon,
      };
    }
  }

  if (currentMoonDayIndex < moonDays.length - 1) {
    next = moonDays[currentMoonDayIndex + 1];
  } else {
    const firstRiseAfterNextNewMoon = collectMoonRises(
      nextNewMoon,
      new Date(nextNewMoon.getTime() + 5 * MILLISECONDS_IN_DAY),
      latitude,
      longitude
    )[0];
    if (firstRiseAfterNextNewMoon) {
      next = {
        day: 1,
        start: nextNewMoon,
        end: firstRiseAfterNextNewMoon,
      };
    }
  }

  return {
    previous,
    current: moonDays[currentMoonDayIndex],
    next,
  };
};
