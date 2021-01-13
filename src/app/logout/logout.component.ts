import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../shared/service/token-storage.service';
import {Router} from '@angular/router';
import {AuthenticationStatusService} from '../shared/events/authentication-status-service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(private tokenService: TokenStorageService,
                private route: Router,
                private authenticationStatus: AuthenticationStatusService) {

    }

    ngOnInit(): void {
        this.tokenService.emptyStorage();
        this.authenticationStatus.setAuthenticationStatus(!!this.tokenService.getToken());
        setTimeout(() => {
            this.route.navigate(['/login']);
        }, 30000);

    }

}
