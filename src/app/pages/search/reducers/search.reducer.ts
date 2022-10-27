import { createReducer, on } from '@ngrx/store';

import * as SearchActions from '../actions/search.actions';
import { ErrorResponse, OmdbApiSearchResponse, Show } from 'src/app/models/request-response.model';

export const searchFeatureKey = 'search';

export interface State {
  showList: Show[];
  totalResults: number | undefined;
  page: number;
  filterText: string | undefined;
  filterType: string | undefined;
  filterYear: string | undefined;
  loadingShows: boolean,
  tooManyResults: {value: boolean}
}

export const initialState: State = {
  showList: [],
  totalResults: undefined,
  page: 1,
  filterText: undefined,
  filterType: undefined,
  filterYear: undefined,
  loadingShows: false,
  tooManyResults: {value: false}
}

export const reducer = createReducer(
  initialState,

  on(SearchActions.loadShows, (state, action) => ({
    ...state,
    loadingShows: true
  })),

  on(SearchActions.loadShowsSuccess, (state, action) => ({
    ...state,
    showList: action.data.Response === 'False' ? [] : action.data.page === 1 ? action.data.Search : [...state.showList, ...action.data.Search],
    totalResults: action.data.Response === 'False' ? 0 : Number(action.data.totalResults),
    page: Number(action.data.page),
    loadingShows: false,
    tooManyResults: action.data.Response === 'False' && action.data?.Error === ErrorResponse.TooManyResults ? {value: true} : {value: false}
  })),

  on(SearchActions.loadShowsFailure, (state, action) => ({
    ...state,
    loadingShows: true,
    totalResults: state.showList.length ? state.showList.length : 0
  })),

  on(SearchActions.nextPage, (state, action) => ({
    ...state,
    page: state.page + 1
  })),

  on(SearchActions.setFiltered, (state, action) => ({
    ...state,
    filterText: action.filterText ? action.filterText : state.filterText,
    filterType: action.filterType ? action.filterType : state.filterType,
    filterYear: action.filterYear ? action.filterYear : state.filterYear,
    page: action.page ? action.page : state.page
  })),
)
