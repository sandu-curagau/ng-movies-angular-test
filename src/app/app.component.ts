import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavbarEventTypes } from './enums/event-types.enum';
import { NavbarEvent } from './models/output-events.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  supportedLanguages = ['en', 'es', 'pt'];
  selectedLanguage: string;

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(this.supportedLanguages);
    this.translateService.setDefaultLang('en');
    const browserLang = this.translateService.getBrowserLang();
    this.selectedLanguage = browserLang ? browserLang : 'en';
    this.translateService.use(browserLang ? browserLang : 'en');
  }

  navbarEvent(event: NavbarEvent): void {
    switch(event.eventType) {
      case NavbarEventTypes.LanguageChanged:
        this.selectedLanguage = event.data;
        this.translateService.use(this.selectedLanguage);
        break;
      default:
        break;
    }
  }
}
