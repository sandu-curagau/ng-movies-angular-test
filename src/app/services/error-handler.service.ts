import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorCode } from '../enums/error-code.enum';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  public errorMsg: string;
  contactMsg: string = 'Please contact with your administrator.';

  constructor() {}

  public handleError = (error: HttpErrorResponse) => {
    const errorDescription = this.getErrorDescription(error);

    switch (error.status) {
      case ErrorCode.Error0:
        this.errorMsg = `Athena is currently unavailable. ${this.contactMsg} Error message: ${errorDescription}. Error status: ${error.status}`;
        break;
      case ErrorCode.Error500:
        this.errorMsg = `${this.contactMsg} Error message: ${errorDescription}. Error status: ${error.status}`;
        break;
      case ErrorCode.Error401:
        this.errorMsg = `Unauthorized: ${errorDescription}.`;
        break;
      default:
        break;
    }
    // here call to display dialog with error
  };

  public getErrorDescription(error: HttpErrorResponse): string {
    return error.error.errorDescription
      ? error.error.errorDescription
      : error.statusText;
  }
}
