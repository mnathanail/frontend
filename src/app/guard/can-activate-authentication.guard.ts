import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../shared/service/token-storage.service';
import {AuthenticationStatusService} from '../shared/events/authentication-status-service';
import {ProfileModel} from '../profile/profile-model';


@Injectable({
    providedIn: 'root'
})
export class CanActivateAuthenticationGuard implements CanActivate {

    private user: ProfileModel;

    constructor(private tokenService: TokenStorageService,
                private router: Router,
                private authenticationStatus: AuthenticationStatusService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!!this.tokenService.getToken() === false) {
            this.router.navigate(['/login']);
            return false;
        }

        let hasRole;
        if (!!this.tokenService.getToken()) {
            this.authenticationStatus.setAuthenticationStatus(!!this.tokenService.getToken());

            this.user = (this.tokenService.getUser() as ProfileModel);
            const authorities = this.user.authorities;

            const t = (route.data.authorities as []);
            if (t !== undefined) {
                hasRole = t.filter(value => this.user.authorities.some(i => i.authority.includes(value)));
                // console.log(hasRole);
                return true;
                //return hasRole.length > 0;
            } else {
                return true;
            }
        }
        //this.router.navigate(['/login']);
        return true;
    }

}
