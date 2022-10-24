import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from "@ngrx/store";

import { SearchService } from "../search.service";

@Injectable()
export class SearchEffects {

  constructor(
    private actions$: Actions,
    private store: Store<{}>,
    private searchService: SearchService
  ) {}

}
