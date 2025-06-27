import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MoonDaysService } from '../../services';
import { MoonDayComponent } from '../moon-day/moon-day.component';

@Component({
  selector: 'app-moon-days-component',
  imports: [MoonDayComponent, TranslateModule],
  templateUrl: './moon-days-component.component.html',
  styleUrl: './moon-days-component.component.scss',
  providers: [MoonDaysService],
})
export class MoonDaysComponentComponent {
  moonDaysService = inject(MoonDaysService);
  moonDaysWindow = this.moonDaysService.moonDaysWindow;
}
