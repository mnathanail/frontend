import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../shared/service/token-storage.service';
import {Router} from '@angular/router';
import {AuthenticationStatusService} from '../shared/events/authentication-status-service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {

    isLoggedIn = false;
    private destroy$ = new Subject();

    constructor(private tokenService: TokenStorageService,
                private route: Router,
                private authenticationStatus: AuthenticationStatusService) {
        this.authStatus();
    }

    ngOnInit(): void {
    }

    authStatus(): void {
        this.authenticationStatus.getAuthenticationStatus()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    this.isLoggedIn = value;
                },
                error => {
                    this.authenticationStatus.setAuthenticationStatusError(error);
                },
                () => {

                }
            );
    }

}
