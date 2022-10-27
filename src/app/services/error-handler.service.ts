import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

import { ErrorCode } from '../enums/error-code.enum';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  public errorMsg: string;
  contactMsg: string = 'Please contact with your administrator.';

  constructor(private messageService: MessageService) {}

  public handleError = (error: HttpErrorResponse) => {
    const errorDescription = this.getErrorDescription(error);

    switch (error.status) {
      case ErrorCode.Error0:
        this.errorMsg = `Our servies are currently unavailable. ${this.contactMsg} Error message: ${errorDescription}. Error status: ${error.status}`;
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
    this.showErrorToast(error);
  };

  public getErrorDescription(error: HttpErrorResponse): string {
    return error.error.errorDescription
      ? error.error.errorDescription
      : error.statusText;
  }

  public showErrorToast(error: any): void {
    this.messageService.add({severity:'error', summary: 'Error', detail: error});
  }
}
