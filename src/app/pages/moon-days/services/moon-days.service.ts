import { Injectable } from '@angular/core';
import { MoonDaysWindow } from '../entities';
import { getMoonDaysWindow } from './calculations';

const latitude = 52.2297;
const longitude = 21.0122;
@Injectable({
  providedIn: 'root',
})
export class MoonDaysService {
  generateMoonDaysWindow(): MoonDaysWindow {
    return getMoonDaysWindow(latitude, longitude);
  }
}
