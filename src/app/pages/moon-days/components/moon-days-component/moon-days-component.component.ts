import { Component } from '@angular/core';

import { MoonDaysService } from '../../services';
import { MoonDayComponent } from '../moon-day/moon-day.component';

@Component({
  selector: 'app-moon-days-component',
  imports: [MoonDayComponent],
  templateUrl: './moon-days-component.component.html',
  styleUrl: './moon-days-component.component.scss',
  providers: [MoonDaysService],
})
export class MoonDaysComponentComponent {

}
