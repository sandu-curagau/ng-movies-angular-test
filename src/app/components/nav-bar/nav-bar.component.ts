import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { NavbarEventTypes } from 'src/app/enums/event-types.enum';
import { KeyLabelObject } from 'src/app/models/generic.model';
import { NavbarEvent } from 'src/app/models/output-events.model';
import { transformStringToKeyLabelObject } from 'src/app/utils/key-label.utils';


@UntilDestroy()
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  supportedLanguagesList: KeyLabelObject[] = [];
  @Input() set supportedLanguagesInput(list: string[]) {
    if (list.length) {
      list.forEach(language => {
        this.supportedLanguagesList.push({name: language, value: language});
      });
    }
  }

  selectedLanguage: KeyLabelObject;
  @Input() set selectedLanguageInput(language: string) {
    this.selectedLanguage = transformStringToKeyLabelObject(language);
  }

  @Output() navbarEventEmitter = new EventEmitter<NavbarEvent>();

  displaySidebar = false;
  selectedRoute: string;

  constructor(private router: Router) {
    this.router.events.pipe(untilDestroyed(this)).subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.selectedRoute = event.url;
      }
    });
  }

  ngOnInit(): void {}

  navigate(route: string): void {
    this.displaySidebar = false;
    this.router.navigate([route]);
    this.selectedRoute = route;
  }

  changedLanguage(event: any): void {
    this.navbarEventEmitter.emit({
      eventType: NavbarEventTypes.LanguageChanged,
      data: event.value.name
    });
  }

}
