import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  // We could include: local api env url / prepare for different result structure / show success alert message y/n based on entry param
  public serviceGET<T>(
    serviceEndpoint: string,
    args?: any,
  ): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${serviceEndpoint}`, {params: args}).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

}
