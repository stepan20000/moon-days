import { Component, computed, input } from '@angular/core';

import { MoonDay } from '../../entities';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-moon-day',
  imports: [DatePipe],
  templateUrl: './moon-day.component.html',
  styleUrl: './moon-day.component.scss',
})
export class MoonDayComponent {
  moonDay = input<MoonDay>();
  day = computed(() => this.moonDay()?.day);
  start = computed(() => this.moonDay()?.start);
  end = computed(() => this.moonDay()?.end);
  datePipeConfig = 'MMM d, y, h:mm';
}
