import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import * as SearchActions from './actions/search.actions';
import { getLoadingSearch, getShows, getTooManyResults, getTotalResults } from './selectors/search.selector';

import { FilterWithOptionsEventTypes } from 'src/app/enums/event-types.enum';
import { KeyLabelObject } from 'src/app/models/generic.model';
import { FilterWithOptionsEvent } from 'src/app/models/output-events.model';
import { TranslationHelperService } from 'src/app/services/translation-helper.service';
import { OmdbApiTitleIdResponse, Show } from 'src/app/models/request-response.model';
import { transformStringToKeyLabelObject } from 'src/app/utils/key-label.utils';
import { DialogService } from 'primeng/dynamicdialog';
import { InspectShowComponent } from 'src/app/components/inspect-show/inspect-show.component';
import { SearchService } from './search.service';

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  showList$: Observable<Show[]>;
  showList: Show[] = [];
  totalResults$: Observable<any>;
  totalResults: any;
  tooManyResults$: Observable<{value: boolean}>;
  tooManyResults: boolean = false;
  loadingSearch$: Observable<{value: boolean}>;
  loadingSearch: boolean = false;
  supportedFilterOptionsList: KeyLabelObject[] = [];
  supportedSecondFilterOptionsList: KeyLabelObject[] = [];
  tabIndex = 0;
  recommendedShows: any = [];

  constructor(
    private translate: TranslateService,
    private translationHelper: TranslationHelperService,
    private store: Store<{}>,
    public dialogService: DialogService,
    private searchService: SearchService
    ) {
    translate.onLangChange.pipe(untilDestroyed(this)).subscribe(langChange => {
      this.languageUpdated();
    });
  }

  ngOnInit(): void {
    this.showList$ = this.store.pipe(select(getShows));
    this.totalResults$ = this.store.pipe(select(getTotalResults));
    this.tooManyResults$ = this.store.pipe(select(getTooManyResults));
    this.loadingSearch$ = this.store.pipe(select(getLoadingSearch));

    this.store.dispatch(SearchActions.setFiltered({page: 1}));

    this.supportedFilterOptionsList = this.translationHelper.getTranslatedDropdownOptions('search.type');
    this.initYearsOptions();
    this.initRecommendedShow();
    this.storeSubscriptions();
  }

  languageUpdated(): void {
    this.supportedFilterOptionsList = this.translationHelper.getTranslatedDropdownOptions('search.type');
    this.initYearsOptions();
  }

  loadMoreShows(): void {
    this.store.dispatch(SearchActions.nextPage());
    this.store.dispatch(SearchActions.loadShows());
  }

  filterEvent(event: FilterWithOptionsEvent): void {
    switch(event.eventType) {
      case FilterWithOptionsEventTypes.Search:
        this.store.dispatch(SearchActions.clearShows());
        this.store.dispatch(SearchActions.setFiltered({
          filterText: event.data.text,
          filterType: event.data.option.value,
          filterYear: event.data.secondOption.value,
          page: 1
        }));
        this.store.dispatch(SearchActions.loadShows());
        break;
      default:
        break;
    }
  }

  openShowDetails(show: Show): void {
    this.searchService.getShowList({id: show.imdbID}).pipe(untilDestroyed(this)).subscribe((showDetails: OmdbApiTitleIdResponse) => {
      this.dialogService.open(InspectShowComponent, {
        header: `${showDetails.Title}`,
        width: showDetails.Poster === 'N/A' ? '30%' : '70%',
        data: showDetails
      });
    });
  }

  storeSubscriptions(): void {
    this.showList$.pipe(untilDestroyed(this)).subscribe(shows => {
      this.showList = shows;
      if (shows.length) {
        this.tabIndex = this.tabIndex !== 1 ? 1 : this.tabIndex;
      }
    });

    this.totalResults$.pipe(untilDestroyed(this)).subscribe((result: number) => {
      this.totalResults = result;

      if (this.showList.length < 20 && this.totalResults > 10) {
        this.store.dispatch(SearchActions.nextPage());
        this.store.dispatch(SearchActions.loadShows());
      }
    });

    this.tooManyResults$.pipe(untilDestroyed(this)).subscribe(result => {
      this.tooManyResults = result.value;
    });

    this.loadingSearch$.pipe(untilDestroyed(this)).subscribe(result => {
      this.loadingSearch = result.value;
    });
  }

  initYearsOptions(): void {
    this.supportedSecondFilterOptionsList = [];
    this.supportedSecondFilterOptionsList.push(this.translationHelper.getTranslatedDropdownOptions('search.filterYear')[0]);
    for (var i = new Date().getFullYear(); i >= 1920; i--) {
      this.supportedSecondFilterOptionsList.push(transformStringToKeyLabelObject(String(i)));
    }
  }

  // BE would send us relevant movies to show, for now we'll have the id list on FE
  initRecommendedShow(): void {
    const recommendedShowsIDs = ['tt2543164', 'tt0068646', 'tt0071562', 'tt0468569', 'tt0816692'];

    recommendedShowsIDs.forEach(id => {
      this.searchService.getShowList({id}).pipe(untilDestroyed(this)).subscribe((showDetails: OmdbApiTitleIdResponse) => {
        this.recommendedShows.push(showDetails);
        console.log(this.recommendedShows);
      });
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(SearchActions.setFiltered({page: 1, filterText: 'a'}));
    this.store.dispatch(SearchActions.clearShows());
  }

}
