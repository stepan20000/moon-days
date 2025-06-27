import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly translateService = inject(TranslateService);
  title = 'moon-days';

  constructor() {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }
}
