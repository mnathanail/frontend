import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {TokenStorageService} from '../shared/service/token-storage.service';
import {AuthenticationStatusService} from '../shared/events/authentication-status-service';
import {map} from 'rxjs/operators';
import {CanActivateAuthenticationGuard} from './can-activate-authentication.guard';
import {resolve} from 'url';

@Injectable({
    providedIn: 'root'
})
export class CanActivateAuthorizationGuard implements CanActivate, OnDestroy {

    private destroy$ = new Subject();

    constructor(private tokenService: TokenStorageService,
                private authenticationStatus: AuthenticationStatusService,
                private authGuard: CanActivateAuthenticationGuard) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        console.log(route);

        return true;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }



}
