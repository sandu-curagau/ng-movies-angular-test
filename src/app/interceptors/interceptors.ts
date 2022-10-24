import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { EncodeUrlParamsSafelyInterceptor } from './encode-url-params-safely.interceptor';
import { ErrorCatchingInterceptor } from './error-catching.interceptor';

export const interceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: EncodeUrlParamsSafelyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true }
];
