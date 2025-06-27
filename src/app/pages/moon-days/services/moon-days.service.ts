import { computed, inject, Injectable, signal, Signal } from '@angular/core';

import { EMPTY_MOON_DAYS_WINDOW, MoonDaysWindow } from '../entities';
import { getMoonDaysWindow } from '../calculations';
import { GeolocationService } from '../../../core';

@Injectable({
  providedIn: 'root',
})
export class MoonDaysService {
  readonly date = signal<Date>(new Date());
  private readonly geolocationService = inject(GeolocationService);
  private readonly geolocation = this.geolocationService.geolocation;
  readonly moonDaysWindow: Signal<MoonDaysWindow> = computed(() => {
    const geolocation = this.geolocation();
    if (!geolocation) return EMPTY_MOON_DAYS_WINDOW;

    return getMoonDaysWindow(
      geolocation.latitude,
      geolocation.longitude,
      this.date()
    );
  });
}
