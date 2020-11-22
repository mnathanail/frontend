import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpInterceptor} from '@angular/common/http';
import {InjectionToken} from '@angular/core';
import {TokenInterceptor} from './auth/token.interceptor';
import {HttpErrorInterceptor} from './error/http-error.interceptor';

export const interceptors =
    [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ];
