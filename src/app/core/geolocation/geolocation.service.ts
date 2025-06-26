import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  geolocation = signal<GeolocationCoordinates | null>(null);

  constructor() {
    this.getGeolocation();
  }

  private getGeolocation(): void {
    navigator.geolocation.getCurrentPosition(
      position => this.geolocation.set(position.coords),
      () => this.geolocation.set(null),
    );
  }
}
