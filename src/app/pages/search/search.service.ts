import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OmdbApiSearchFilters, OmdbApiSearchFinalParams } from 'src/app/models/request-params-body.model';
import { OmdbApiSearchResponse, OmdbApiTitleIdResponse } from 'src/app/models/request-response.model';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: ApiService) { }

  getShowList(params: OmdbApiSearchFilters): Observable<OmdbApiSearchResponse | OmdbApiTitleIdResponse> {
    const finalParamKeys = {
      filterText: 's',
      filterType: 'type',
      filterYear: 'y',
      page: 'page',
      id: 'i'
    };

    let queryParams: any = {};

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        queryParams[(finalParamKeys as any)[key]] = value;
      }
    }
    return this.apiService.serviceGET('', queryParams);
  }

}
