import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OmdbApiSearchFilters, OmdbApiSearchFinalParams } from 'src/app/models/request-params-body.model';
import { OmdbApiSearchResponse } from 'src/app/models/request-response.model';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: ApiService) { }

  getShowList(params: OmdbApiSearchFilters): Observable<OmdbApiSearchResponse> {
    const queryParams: OmdbApiSearchFinalParams = {
      s: params.filterText,
      type: params.filterType,
      y: params.filterYear,
      page: params.page
    };
    return this.apiService.serviceGET('', queryParams);
  }

}
