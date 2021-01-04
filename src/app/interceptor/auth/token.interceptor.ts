import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../../shared/service/token-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private token = '';

    constructor(private tokenService: TokenStorageService) {
        this.token = tokenService.getToken();
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log(request);
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.token}`
            }
        });
        return next.handle(request);
    }
}
