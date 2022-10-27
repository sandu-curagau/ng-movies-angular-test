export interface OmdbApiSearchFilters {
  filterText?: string | undefined;
  filterType?: string | undefined;
  filterYear?: string | undefined;
  page?: number;
}

export interface OmdbApiSearchFinalParams {
  s?: string | undefined;
  type?: string | undefined;
  y?: string | undefined;
  page?: number;
}
