import {Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaderResponse,
    HttpInterceptor, HttpProgressEvent,
    HttpRequest, HttpResponse,
    HttpSentEvent, HttpUserEvent
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Route, Router} from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            //retry(2),
            catchError((error) => {

                let handled = false;
                console.error(error);
                if (error instanceof HttpErrorResponse) {
                    if (error.error instanceof ErrorEvent) {
                        console.error('Error Event');
                    }
                    else {
                        console.log(`error status : ${error.status} ${error.statusText}`);
                        switch (error.status) {
                            case 401:      // login
                                this.router.navigateByUrl('/login');
                                console.log(`redirect to login`);
                                handled = true;
                                break;
                            case 403:     // forbidden
                                this.router.navigateByUrl('/login');
                                console.log(`redirect to login`);
                                handled = true;
                                break;
                        }
                    }
                }
                else {
                    console.error('You better run!');
                }

                if (handled) {
                    console.log('return back ');
                    return of(error);
                } else {
                    console.log('throw error back to to the subscriber');
                    return throwError(error);
                }

            })
        );
    }
}
