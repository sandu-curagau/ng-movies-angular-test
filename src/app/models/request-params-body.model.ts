export interface OmdbApiSearchFilters {
  filterText?: string;
  filterType?: string;
  filterYear?: string;
  page?: number;
  id?: string;
}

export interface OmdbApiSearchFinalParams {
  s?: string;
  type?: string;
  y?: string;
  page?: number;
  i?: string;
}
