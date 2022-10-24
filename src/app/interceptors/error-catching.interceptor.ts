import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from "rxjs/operators";

import { ErrorHandlerService } from './../services/error-handler.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private errorHandler: ErrorHandlerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        map(res => {
            return res
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          return throwError(() => new Error(this.errorHandler.getErrorDescription(error)));
        })
      )
  }
}
