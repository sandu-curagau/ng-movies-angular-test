import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSearch from '../reducers/search.reducer';

export const selectSearchState = createFeatureSelector<fromSearch.State>(
  fromSearch.searchFeatureKey
);

export const getShows = createSelector(
  selectSearchState,
  (searchData: fromSearch.State) => searchData.showList
);

export const getSearchPageFilters = createSelector(
  selectSearchState,
  (searchData: fromSearch.State) => ({
    filterText: searchData.filterText,
    filterType: searchData.filterType,
    filterYear: searchData.filterYear,
    page: searchData.page
  })
);

export const getLoadingSearch = createSelector(
  selectSearchState,
  (searchData: fromSearch.State) => searchData.loadingShows
);

export const getPageNumber = createSelector(
  selectSearchState,
  (searchData: fromSearch.State) => searchData.page
);

export const getTooManyResults = createSelector(
  selectSearchState,
  (searchData: fromSearch.State) => searchData.tooManyResults
);
