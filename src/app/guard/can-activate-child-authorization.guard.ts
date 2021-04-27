import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ProfileModel} from '../profile/profile-model';
import {TokenStorageService} from '../shared/service/token-storage.service';
import {AuthenticationStatusService} from '../shared/events/authentication-status-service';

@Injectable({
    providedIn: 'root'
})
export class CanActivateChildAuthorizationGuard implements CanActivateChild {

    private user: ProfileModel;

    constructor(private tokenService: TokenStorageService,
                private router: Router,
                private authenticationStatus: AuthenticationStatusService) {
    }


    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let hasRole;
        if (!!this.tokenService.getToken()) {
            this.authenticationStatus.setAuthenticationStatus(!!this.tokenService.getToken());

            this.user = (this.tokenService.getUser() as ProfileModel);
            const authorities = this.user.authorities;

            const t = (childRoute.parent.data.authorities as []);
            if (t !== undefined) {
                hasRole = t.filter(value => this.user.authorities.some(i => i.authority.includes(value)));
                return hasRole.length > 0;
            } else {
                return true;
            }
        }
        return false;
    }

}
