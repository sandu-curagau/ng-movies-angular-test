import { createReducer, on } from '@ngrx/store';

import * as SearchActions from '../actions/search.actions';
import { ErrorResponse, Show, StatusResponse } from 'src/app/models/request-response.model';

export const searchFeatureKey = 'search';

export interface State {
  showList: Show[];
  totalResults: number | undefined;
  page: number;
  filterText: string | undefined;
  filterType: string | undefined;
  filterYear: string | undefined;
  loadingShows: {value: boolean},
  tooManyResults: {value: boolean}
}

export const initialState: State = {
  showList: [],
  totalResults: undefined,
  page: 1,
  filterText: undefined,
  filterType: undefined,
  filterYear: undefined,
  loadingShows: {value: false},
  tooManyResults: {value: false}
}

export const reducer = createReducer(
  initialState,

  on(SearchActions.loadShows, (state, action) => ({
    ...state,
    loadingShows: {value: true}
  })),

  on(SearchActions.loadShowsSuccess, (state, action) => ({
    ...state,
    showList: action.data.Response === StatusResponse.Error ? [] : action.data.page === 1 ? action.data.Search : [...state.showList, ...action.data.Search],
    totalResults: action.data.Response === StatusResponse.Error ? 0 : Number(action.data.totalResults),
    loadingShows: {value: false},
    tooManyResults: action.data.Response === StatusResponse.Error && action.data?.Error === ErrorResponse.TooManyResults ? {value: true} : {value: false}
  })),

  on(SearchActions.loadShowsFailure, (state, action) => ({
    ...state,
    loadingShows: {value: false},
    totalResults: state.showList.length ? state.showList.length : 0
  })),

  on(SearchActions.nextPage, (state, action) => ({
    ...state,
    page: Number(state.page) + 1
  })),

  on(SearchActions.setFiltered, (state, action) => ({
    ...state,
    filterText: action.filterText ? action.filterText : state.filterText,
    filterType: action.filterType ? action.filterType : state.filterType,
    filterYear: action.filterYear ? action.filterYear : state.filterYear,
    page: Number(action.page) ? Number(action.page) : Number(state.page)
  })),

  on(SearchActions.clearShows, (state, action) => ({
    ...state,
    showList: [],
    totalResults: 0
  })),
)
