import {Injectable, OnDestroy} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../shared/service/token-storage.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor, OnDestroy {
    private destroy$ = new Subject();

    constructor(private router: Router,
                private tokenService: TokenStorageService) {
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                    }
                    console.log(error);
                    if (error.status === 401 || error.status === 403) {
                        // clear sessionStorage
                        this.router.navigate(['/login'], {skipLocationChange: true})
                            .then((value) => {
                                this.tokenService.emptyStorage();
                            });
                    }
                    return throwError(errorMessage);
                })
            );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

}
