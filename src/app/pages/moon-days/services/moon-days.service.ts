import { computed, inject, Injectable, Signal } from '@angular/core';

import { EMPTY_MOON_DAYS_WINDOW, MoonDaysWindow } from '../entities';
import { getMoonDaysWindow } from './calculations';
import { GeolocationService } from '../../../core';

@Injectable({
  providedIn: 'root',
})
export class MoonDaysService {
  geolocationService = inject(GeolocationService);
  geolocation = this.geolocationService.geolocation;
  moonDaysWindow: Signal<MoonDaysWindow> = computed(() => {
    const geolocation = this.geolocation();
    if (!geolocation) return EMPTY_MOON_DAYS_WINDOW;

    return getMoonDaysWindow(geolocation.latitude, geolocation.longitude);
  });
}
