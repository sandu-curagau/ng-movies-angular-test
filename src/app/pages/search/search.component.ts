import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import * as SearchActions from './actions/search.actions';
import { getShows, getTooManyResults } from './selectors/search.selector';

import { FilterWithOptionsEventTypes } from 'src/app/enums/event-types.enum';
import { KeyLabelObject } from 'src/app/models/generic.model';
import { FilterWithOptionsEvent } from 'src/app/models/output-events.model';
import { TranslationHelperService } from 'src/app/services/translation-helper.service';
import { Show } from 'src/app/models/request-response.model';

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  showList$: Observable<Show[]>;
  showList: Show[];
  tooManyResults$: Observable<{value: boolean}>;
  tooManyResults: boolean = false;
  supportedFilterOptionsList: KeyLabelObject[] = [];

  constructor(
    private translate: TranslateService,
    private translationHelper: TranslationHelperService,
    private store: Store<{}>
    ) {
    translate.onLangChange.pipe(untilDestroyed(this)).subscribe(langChange => {
      this.languageUpdated();
    });
  }

  ngOnInit(): void {
    this.supportedFilterOptionsList = [];
    this.supportedFilterOptionsList = this.translationHelper.getTranslatedDropdownOptions('search.type');

    this.showList$ = this.store.pipe(select(getShows));
    this.tooManyResults$ = this.store.pipe(select(getTooManyResults));
    this.store.dispatch(SearchActions.setFiltered({page: 1}));

    this.showList$.pipe(untilDestroyed(this)).subscribe(shows => {
      this.showList = shows;
      console.log(this.showList);
    });

    this.tooManyResults$.pipe(untilDestroyed(this)).subscribe(result => {
      this.tooManyResults = result.value;
      console.log('Too Many Results');
    });
  }

  languageUpdated(): void {
    this.supportedFilterOptionsList = this.translationHelper.getTranslatedDropdownOptions('search.type');
  }

  filterEvent(event: FilterWithOptionsEvent): void {
    switch(event.eventType) {
      case FilterWithOptionsEventTypes.Search:
        this.store.dispatch(SearchActions.setFiltered({
          filterText: event.data.text,
          filterType: event.data.option.value,
          page: 1
        }));
        this.store.dispatch(SearchActions.loadShows());
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(SearchActions.setFiltered({page: 1, filterText: 'a'}));
    this.store.dispatch(SearchActions.clearShows());
  }

}
