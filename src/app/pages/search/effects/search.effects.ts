import { Injectable } from "@angular/core";
import { catchError, concatMap, map, of, withLatestFrom } from "rxjs";

import { select, Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { SearchService } from "../search.service";
import * as SearchActions from '../actions/search.actions';
import { getSearchPageFilters } from "../selectors/search.selector";

@Injectable()
export class SearchEffects {

  constructor(
    private actions$: Actions,
    private store: Store<{}>,
    private searchService: SearchService
  ) {}

  loadShows$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchActions.loadShows),
      withLatestFrom(this.store.pipe(select(getSearchPageFilters))),
      concatMap(([action, params]) =>
        this.searchService.getShowList(params).pipe(
          map(data => SearchActions.loadShowsSuccess({ data })),
          catchError(error => of(SearchActions.loadShowsFailure({ error }))))
      )
    );
  });

}
