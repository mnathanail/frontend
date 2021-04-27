import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './auth/token.interceptor';
import {HttpErrorInterceptor} from './error/http-error.interceptor';
import {Router} from '@angular/router';

export const interceptors =
    [
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        /*{provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},*/
    ];
