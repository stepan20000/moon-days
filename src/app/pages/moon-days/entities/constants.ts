import { MoonDaysWindow } from './interfaces';

export const MILLISECONDS_IN_SECOND = 1000;
export const MILLISECONDS_IN_MINUTE = 60 * MILLISECONDS_IN_SECOND;
export const MILLISECONDS_IN_HOUR = 60 * MILLISECONDS_IN_MINUTE;
export const MILLISECONDS_IN_DAY = 24 * MILLISECONDS_IN_HOUR;

export const EMPTY_MOON_DAYS_WINDOW: MoonDaysWindow = {
  previous: null,
  current: null,
  next: null,
};
