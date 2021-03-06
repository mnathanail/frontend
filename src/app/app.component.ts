import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from './shared/service/token-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    isLoggedIn = false;

    constructor(private http: HttpClient,
                private router: Router,
                private tokenService: TokenStorageService) {
        this.isLoggedIn = !!tokenService.getToken();
    }

/*    logout(): void {
        this.http.post('logout', {}).finally(() => {
            this.app.authenticated = false;
            this.router.navigateByUrl('/login');
        }).subscribe();
    }*/
}
