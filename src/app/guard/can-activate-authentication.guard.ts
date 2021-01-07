import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../shared/service/token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class CanActivateAuthenticationGuard implements CanActivate {

    constructor(private tokenService: TokenStorageService,
                private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        console.log(route);
        console.log(state);
        if (this.tokenService.getToken()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

}
