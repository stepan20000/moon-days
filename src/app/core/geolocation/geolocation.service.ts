import { Injectable, signal } from '@angular/core';

const fakeGeolocationCoordinatesMoscow = {
  latitude: 55.755826,
  longitude: 37.6173,
} as GeolocationCoordinates;

const fakeGeolocationCoordinatesWarsaw = {
  latitude: 30.2058,
  longitude: -97.8002,
} as GeolocationCoordinates;

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  geolocation = signal<GeolocationCoordinates | null>(null);

  constructor() {
    this.getGeolocation();
  }

  private getGeolocation(): void {
    // navigator.geolocation.getCurrentPosition(
    //   position => this.geolocation.set(position.coords),
    //   () => this.geolocation.set(null),
    // );

    setTimeout(() => {
      this.geolocation.set(fakeGeolocationCoordinatesWarsaw);
    }, 3000);
  }
}
