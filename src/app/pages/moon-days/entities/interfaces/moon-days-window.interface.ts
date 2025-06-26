import { MoonDay } from "./moon-day.interface";

export interface MoonDaysWindow {
  previous: MoonDay | null;
  current: MoonDay | null;
  next: MoonDay | null;
}
