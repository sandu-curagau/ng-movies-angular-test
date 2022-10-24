import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpParameterCodec,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable()
export class EncodeUrlParamsSafelyInterceptor implements HttpInterceptor, HttpParameterCodec {

  constructor(private errorHandler: ErrorHandlerService) {}

  // We can set headers here, set authorizationType to token, set login token, set in app permissions if local or not
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newParams = new HttpParams({
      fromString: request.params.toString(),
      encoder: this,
    });

    let cloneReq;
    cloneReq = request.clone({
      params: newParams
        .set('apikey', environment.apiKey)
    });

    return next
      .handle(cloneReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(this.errorHandler.getErrorDescription(error)));
      })
    );
  }

  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }

}
