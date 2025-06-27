import { signal } from "@angular/core";
import { GeolocationService } from "../../../core";
import { MoonDaysService } from "./moon-days.service";
import { TestBed } from "@angular/core/testing";
import { MoonDaysWindow } from "../entities";

describe('MoonDaysService', () => {
  let fakeGeolocationService: jasmine.SpyObj<GeolocationService>;
  let fakeCoordinates: Partial<GeolocationCoordinates>;
  let sut: MoonDaysService;

  beforeEach(() => {
    fakeCoordinates = {
      latitude: 52.2297,
      longitude: 21.0122,
    };
    fakeGeolocationService = jasmine.createSpyObj('GeolocationService', [], {
      geolocation: signal(null),
    });

    TestBed.configureTestingModule({
      providers: [
        MoonDaysService,
        { provide: GeolocationService, useValue: fakeGeolocationService },
      ],
    });

    sut = TestBed.inject(MoonDaysService);
  });

  it('should calculate moon days window when date is in the middle of moon cycle', () => {
    const date = new Date('2025-06-27T09:00Z');
    fakeGeolocationService.geolocation.set(
      fakeCoordinates as GeolocationCoordinates
    );
    sut.date.set(date);
    const expectedMoonWindow: MoonDaysWindow = {
      previous: {
        day: 2,
        start: new Date(1750905211275),
        end: new Date(1750996553739),
      },
      current: {
        day: 3,
        start: new Date(1750996553739),
        end: new Date(1751088153078),
      },
      next: {
        day: 4,
        start: new Date(1751088153078),
        end: new Date(1751179554218),
      },
    };

    expect(sut.moonDaysWindow()).toEqual(expectedMoonWindow);
  });

  it('should calculate moon days window when date is in the same day after new moon', () => {
    const date = new Date('2025-06-25T11:00Z');
    fakeGeolocationService.geolocation.set(
      fakeCoordinates as GeolocationCoordinates
    );
    sut.date.set(date);
    const expectedMoonWindow: MoonDaysWindow = {
      previous: {
        day: 29,
        start: new Date(1750724878171),
        end: new Date(1750847610213),
      },
      current: {
        day: 1,
        start: new Date(1750847610213),
        end: new Date(1750905211275),
      },
      next: {
        day: 2,
        start: new Date(1750905211275),
        end: new Date(1750996553739),
      },
    };

    expect(sut.moonDaysWindow()).toEqual(expectedMoonWindow);
  });
  
  it('should calculate moon days window when date is in the same day before new moon', () => {
    const date = new Date('2025-06-25T10:00Z');
    fakeGeolocationService.geolocation.set(
      fakeCoordinates as GeolocationCoordinates
    );
    sut.date.set(date);
    const expectedMoonWindow: MoonDaysWindow = {
      previous: {
        day: 28,
        start: new Date(1750724878171),
        end: new Date(1750814477969),
      },
      current: {
        day: 29,
        start: new Date(1750814477969),
        end: new Date(1750847610213),
      },
      next: {
        day: 1,
        start: new Date(1750847610213),
        end: new Date(1750905211275),
      },
    };

    expect(sut.moonDaysWindow()).toEqual(expectedMoonWindow);
  });

  it('should calculate moon days window when date is in the middle of moon cycle in Austin', () => {
    const date = new Date('2025-06-27T09:00Z');
    fakeCoordinates = {
      latitude: 30.2058,
      longitude: -97.8002,
    };
    fakeGeolocationService.geolocation.set(
      fakeCoordinates as GeolocationCoordinates
    );
    sut.date.set(date);
    const expectedMoonWindow: MoonDaysWindow = {
      previous: {
        day: 2,
        start: new Date(1750850923631),
        end: new Date(1750941332871),
      },
      current: {
        day: 3,
        start: new Date(1750941332871),
        end: new Date(1751031753866),
      },
      next: {
        day: 4,
        start: new Date(1751031753866),
        end: new Date(1751122038154),
      },
    };

    expect(sut.moonDaysWindow()).toEqual(expectedMoonWindow);
  });
});
