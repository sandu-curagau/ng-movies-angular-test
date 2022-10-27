import { createAction, props } from "@ngrx/store";
import { OmdbApiSearchFilters } from "src/app/models/request-params-body.model";

export const loadShows = createAction(
  '[Search] Load Shows'
);

export const loadShowsSuccess = createAction(
  '[Search] Load Shows Success',
  props<{data: any}>()
);

export const loadShowsFailure = createAction(
  '[Search] Load Shows Failure',
  props<{error: any}>()
);

export const nextPage = createAction(
  '[Search] Next Page'
);

export const clearShows = createAction(
  '[Search] Clear Shows'
);

export const setFiltered = createAction(
  '[Search] Set Filtered',
  props<OmdbApiSearchFilters>()
);
